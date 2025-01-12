function isLocalhost(url) {
  return url.hostname === "localhost" || url.hostname === "127.0.0.1";
}

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if we're on localhost:3000 to sync passwords
  if (changeInfo.url && changeInfo.url.startsWith("http://localhost:3000")) {
    browser.tabs.sendMessage(tabId, { type: "SYNC_PASSWORDS" });
  }

  // Security check for all URLs except localhost
  if (changeInfo.url) {
    const url = new URL(changeInfo.url);

    if (isLocalhost(url)) {
      // Set a special status for localhost
      const localhostData = {
        security_headers: {
          status: "localhost",
        },
        ssl_certificate: {
          status: "localhost",
          days_remaining: "-",
        },
        validation: {
          is_valid: true,
          message: "This is a localhost environment",
        },
      };

      browser.storage.local.set({
        [`security_${url.hostname}`]: localhostData,
      });
      updateExtensionStatus(tabId, localhostData);
    } else {
      const apiUrl = `http://localhost:1453/check?url=${encodeURIComponent(
        url.href
      )}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          browser.storage.local.set({
            [`security_${url.hostname}`]: data,
          });
          updateExtensionStatus(tabId, data);
        })
        .catch((error) => {
          console.error("Error fetching security data:", error);
        });
    }
  }
});

function updateExtensionStatus(tabId, securityData) {
  const badgeColor = securityData.validation.is_valid ? "#4CAF50" : "#F44336";
  browser.browserAction.setBadgeBackgroundColor({ color: badgeColor, tabId });
  browser.browserAction.setBadgeText({
    text: securityData.validation.is_valid ? "✓" : "!",
    tabId,
  });
}
