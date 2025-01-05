// Listen for password changes in localStorage
let lastKnownPasswords = null;

function checkForPasswordChanges() {
  if (window.location.origin === "http://localhost:3000") {
    const currentPasswords = localStorage.getItem("passwordList");
    if (currentPasswords !== lastKnownPasswords) {
      lastKnownPasswords = currentPasswords;
      // Store passwords in extension storage
      browser.storage.local.set({
        passwords: currentPasswords ? JSON.parse(currentPasswords) : [],
      });
    }
  }
}

// Check for changes every second when on localhost:3000
setInterval(() => {
  if (window.location.origin === "http://localhost:3000") {
    checkForPasswordChanges();
  }
}, 1000);

// Initial check when script loads
checkForPasswordChanges();

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (
    message.type === "SYNC_PASSWORDS" &&
    window.location.origin === "http://localhost:3000"
  ) {
    const passwords = localStorage.getItem("passwordList");
    browser.storage.local.set({
      passwords: passwords ? JSON.parse(passwords) : [],
    });
  }
  return true;
});
