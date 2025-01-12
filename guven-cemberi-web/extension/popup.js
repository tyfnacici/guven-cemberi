document.addEventListener("DOMContentLoaded", function () {
  loadSecurityInfo();
  loadPasswords();

  document.getElementById("open-generator").addEventListener("click", () => {
    browser.tabs.create({
      url: "http://localhost:3000/sifre-olusturucu/olustur",
    });
  });
});

function loadSecurityInfo() {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    const currentTab = tabs[0];
    const hostname = new URL(currentTab.url).hostname;

    browser.storage.local.get(`security_${hostname}`).then((data) => {
      const securityInfo = data[`security_${hostname}`];
      if (securityInfo) {
        displaySecurityInfo(securityInfo);
      } else {
        document.getElementById("security-info").textContent =
          "No security information available for this site.";
      }
    });
  });
}

function displaySecurityInfo(data) {
  const container = document.getElementById("security-info");

  if (data.security_headers.status === "localhost") {
    container.innerHTML = `
      <div class="security-item">
        <span>Status:</span>
        <span class="status-valid">Localhost Environment</span>
      </div>
      <div class="security-item">
        <span>Message:</span>
        <span>Security checks are disabled for localhost</span>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="security-item">
      <span>SSL Certificate:</span>
      <span class="${
        data.ssl_certificate.status === "valid"
          ? "status-valid"
          : "status-invalid"
      }">
        ${data.ssl_certificate.status.toUpperCase()}
      </span>
    </div>
    <div class="security-item">
      <span>Expires in:</span>
      <span>${data.ssl_certificate.days_remaining} days</span>
    </div>
    <div class="security-item">
      <span>Security Headers:</span>
      <span>${Object.keys(data.security_headers.found_headers).length} present,
            ${data.security_headers.missing_headers.length} missing</span>
    </div>
  `;
}

function loadPasswords() {
  // Get passwords directly from extension storage
  browser.storage.local
    .get("passwords")
    .then((data) => {
      const passwords = data.passwords || [];
      displayPasswords(passwords);
    })
    .catch((error) => {
      console.error("Error loading passwords:", error);
      document.getElementById("password-list").innerHTML =
        "<p>Unable to load passwords.</p>";
    });
}

function displayPasswords(passwords) {
  const container = document.getElementById("password-list");

  if (!passwords || passwords.length === 0) {
    container.innerHTML = "<p>No passwords saved yet.</p>";
    return;
  }

  container.innerHTML = passwords
    .map((entry) => {
      const password = entry.password;
      return `
        <div class="password-item">
          <strong>${entry.description}</strong>
          <span class="password-text" data-password="${password}">••••••••</span>
        </div>
      `;
    })
    .join("");
}
