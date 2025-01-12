from flask import Flask, request, jsonify
from flask_cors import CORS
import ssl
import socket
import requests
import subprocess
import json
import re
from datetime import datetime, timezone
from urllib.parse import urlparse
import validators
import email_validator

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

def parse_phone_intel_output(output):
    """Parse the phoneintel command output and return structured data."""
    result = {
        "target_phone": None,
        "country": None,
        "area_state": None,
        "carrier": None,
        "instagram_registered": None,
        "country_details": {
            "top_level_domain": None,
            "continent": None,
            "capital": None,
            "time_zone": None,
            "currency": None,
            "languages": [],
            "latitude": None,
            "longitude": None
        },
        "tellows_details": {
            "url": None,
            "score": None,
            "call_type": None
        },
        "spamcalls_details": {
            "url": None,
            "explanation": None,
            "spam_risk": None,
            "last_activity": None,
            "latest_report": None
        }
    }
    
    lines = output.split('\n')
    in_languages_section = False
    
    for line in lines:
        line = line.strip()
        
        # Basic information
        if "TARGET PHONE:" in line:
            result["target_phone"] = line.split(": ")[1]
        elif "COUNTRY:" in line and "DETAILS" not in line:
            result["country"] = line.split(": ")[1]
        elif "AREA/STATE:" in line:
            result["area_state"] = line.split(": ")[1]
        elif "CARRIER:" in line:
            result["carrier"] = line.split(": ")[1]
        elif "INSTAGRAM ACCOUNT REGISTERED:" in line:
            result["instagram_registered"] = line.split(": ")[1] == "YES"
            
        # Country details
        elif "Top Level Domain:" in line:
            result["country_details"]["top_level_domain"] = line.split(": ")[1]
        elif "Continent:" in line:
            result["country_details"]["continent"] = line.split(": ")[1]
        elif "Capital:" in line:
            result["country_details"]["capital"] = line.split(": ")[1]
        elif "Time Zone:" in line:
            result["country_details"]["time_zone"] = line.split(": ")[1]
        elif "Currency:" in line:
            result["country_details"]["currency"] = line.split(": ")[1]
        elif "Languages:" in line:
            in_languages_section = True
            continue
        elif "Latitude:" in line:
            try:
                result["country_details"]["latitude"] = float(line.split(": ")[1])
            except (ValueError, IndexError):
                result["country_details"]["latitude"] = None
        elif "Longitude:" in line:
            try:
                result["country_details"]["longitude"] = float(line.split(": ")[1])
            except (ValueError, IndexError):
                result["country_details"]["longitude"] = None
        elif line.strip().startswith("- ") and in_languages_section and not any(key in line for key in ["Latitude:", "Longitude:"]):
            language = line.strip("- ").strip()
            if language:
                result["country_details"]["languages"].append(language)
            
        elif "---" in line:
            in_languages_section = False
            
        # Tellows details
        elif "Tellows URL:" in line:
            result["tellows_details"]["url"] = line.split(": ")[1]
        elif "Tellows Score:" in line:
            try:
                result["tellows_details"]["score"] = int(line.split(": ")[1])
            except ValueError:
                result["tellows_details"]["score"] = None
        elif "Type of Call:" in line:
            result["tellows_details"]["call_type"] = line.split(": ")[1]
            
        # Spamcalls details
        elif "spamcalls.net URL:" in line:
            result["spamcalls_details"]["url"] = line.split(": ")[1]
        elif "Call Explanation:" in line:
            result["spamcalls_details"]["explanation"] = line.split(": ")[1]
        elif "Spam Risk:" in line:
            result["spamcalls_details"]["spam_risk"] = line.split(": ")[1]
        elif "Last Activity:" in line:
            result["spamcalls_details"]["last_activity"] = line.split(": ")[1]
        elif "Latest Report:" in line:
            result["spamcalls_details"]["latest_report"] = line.split(": ")[1]
    
    return result

def parse_blackbird_output(output):
    """Parse the Blackbird command output into structured JSON."""
    lines = output.split('\n')
    results = []
    current_site = None
    
    # Skip the ASCII art header and update check
    start_processing = False
    
    for line in lines:
        if '▶ Enumerating accounts' in line:
            start_processing = True
            continue
            
        if not start_processing:
            continue
            
        if '🏁 Check completed' in line:
            # Extract timing information
            time_match = re.search(r'completed in ([\d.]+) seconds \((\d+) sites\)', line)
            if time_match:
                execution_info = {
                    "execution_time": float(time_match.group(1)),
                    "sites_checked": int(time_match.group(2))
                }
                break
            continue
            
        # Process found accounts
        if line.strip().startswith('✔️'):
            # Extract site and URL information
            site_info = re.match(r'\s*✔️\s*\[(.*?)\]\s*(.*?)$', line)
            if site_info:
                current_site = {
                    "platform": site_info.group(1),
                    "url": site_info.group(2),
                    "additional_info": {}
                }
                results.append(current_site)
                
        # Process additional information for the current site
        elif line.strip().startswith('➡') and current_site:
            # Extract additional information
            info_match = re.match(r'\s*➡\s*(.*?):\s*(.*?)$', line)
            if info_match:
                key = info_match.group(1).lower().replace(' ', '_')
                value = info_match.group(2)
                current_site["additional_info"][key] = value

    return {
        "results": results,
        "execution_info": execution_info if 'execution_info' in locals() else None,
        "total_found": len(results)
    }

def validate_email(email):
    """Validate email format."""
    try:
        email_validator.validate_email(email)
        return True
    except email_validator.EmailNotValidError:
        return False

def validate_phone(phone):
    """Validate phone number format."""
    phone_pattern = re.compile(r'^\+?[1-9]\d{10,14}$')
    return bool(phone_pattern.match(phone))

def format_phone(phone):
    """Format phone number to standard format."""
    # Remove any whitespace and ensure it starts with '+'
    phone = re.sub(r'\s+', '', phone)
    if not phone.startswith('+'):
        phone = '+' + phone
    return phone

@app.route('/search', methods=['POST'])
def search():
    """
    Endpoint to search using Blackbird for usernames or emails.
    """
    try:
        data = request.get_json()
        if not data or 'search' not in data or 'type' not in data:
            return jsonify({
                "error": "Both 'search' and 'type' are required in the request body."
            }), 400
        
        search_term = data['search'].strip()
        search_type = data['type'].lower()
        
        if search_type not in ['username', 'email']:
            return jsonify({
                "error": "Invalid search type. Must be either 'username' or 'email'."
            }), 400
            
        if search_type == 'email' and not validate_email(search_term):
            return jsonify({
                "error": "Invalid email format."
            }), 400
        
        # Execute the Blackbird command
        cmd = f"python3 /home/ubuntu/blackbird/blackbird.py --{search_type} {search_term}"
        process = subprocess.Popen(
            cmd,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        output, error = process.communicate()
        
        if process.returncode != 0:
            return jsonify({
                "error": "Failed to execute Blackbird command.",
                "details": error
            }), 500
        
        result = parse_blackbird_output(output)
        
        return jsonify({
            "search_term": search_term,
            "search_type": search_type,
            "data": result
        })
    
    except Exception as e:
        return jsonify({
            "error": "An error occurred while processing the request.",
            "details": str(e)
        }), 500

@app.route('/phone', methods=['POST'])
def check_phone():
    """
    Endpoint to check phone number information using phoneintel command.
    """
    try:
        data = request.get_json()
        if not data or 'number' not in data:
            return jsonify({"error": "Phone number is required in the request body."}), 400
        
        phone_number = format_phone(data['number'])
        
        if not validate_phone(phone_number):
            return jsonify({"error": "Invalid phone number format. Use format: +905555555555"}), 400
        
        # Run the phoneintel command
        cmd = f"phoneintel --info {phone_number}"
        process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output, error = process.communicate()
        
        if process.returncode != 0:
            return jsonify({"error": "Failed to execute phoneintel command.", "details": error.decode()}), 500
        
        result = parse_phone_intel_output(output.decode())
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": "An error occurred while processing the request.", "details": str(e)}), 500
       
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