from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS module
import ssl
import socket
import requests
from datetime import datetime, timezone
from urllib.parse import urlparse
import validators

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

def validate_url(url):
    """
    Validate the URL format and ensure it uses HTTPS.
    """
    if not validators.url(url):
        return False, "Invalid URL format."
    parsed_url = urlparse(url)
    if parsed_url.scheme != "https":
        return False, "URL does not use HTTPS."
    return True, "URL is valid and uses HTTPS."

def check_ssl_certificate(hostname):
    """
    Check the SSL certificate of the given hostname.
    """
    context = ssl.create_default_context()
    conn = context.wrap_socket(socket.socket(socket.AF_INET), server_hostname=hostname)
    try:
        conn.settimeout(5.0)
        conn.connect((hostname, 443))
        cert = conn.getpeercert()
        not_after = datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y GMT').replace(tzinfo=timezone.utc)
        remaining_days = (not_after - datetime.now(timezone.utc)).days
        return True, {
            "status": "valid",
            "expires_on": not_after.isoformat(),
            "days_remaining": remaining_days
        }
    except Exception as e:
        return False, {"status": "invalid", "error": str(e)}
    finally:
        conn.close()

def check_security_headers(url):
    """
    Check the security headers of the given URL.
    """
    try:
        response = requests.get(url, timeout=5)
        headers = response.headers
        expected_headers = [
            'Content-Security-Policy',
            'Strict-Transport-Security',
            'X-Content-Type-Options',
            'X-Frame-Options',
            'X-XSS-Protection',
            'Referrer-Policy',
            'Permissions-Policy'
        ]
        found_headers = {header: headers[header] for header in expected_headers if header in headers}
        missing_headers = [header for header in expected_headers if header not in headers]
        return True, {
            "status": "valid" if not missing_headers else "missing",
            "found_headers": found_headers,
            "missing_headers": missing_headers
        }
    except requests.RequestException as e:
        return False, {"status": "error", "error": str(e)}

@app.route('/check', methods=['GET'])
def check_website():
    """
    Endpoint to check the URL for validation, SSL certificate, and security headers.
    """
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "URL parameter is missing."}), 400

    result = {
        "url": url,
        "validation": {},
        "ssl_certificate": {},
        "security_headers": {}
    }

    # Validate URL
    is_valid_url, url_message = validate_url(url)
    result["validation"] = {
        "is_valid": is_valid_url,
        "message": url_message
    }
    if not is_valid_url:
        return jsonify(result)

    # Extract hostname
    hostname = urlparse(url).hostname

    # Check SSL Certificate
    is_valid_ssl, ssl_result = check_ssl_certificate(hostname)
    result["ssl_certificate"] = ssl_result

    # Check Security Headers
    has_security_headers, headers_result = check_security_headers(url)
    result["security_headers"] = headers_result

    return jsonify(result)

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=1453)