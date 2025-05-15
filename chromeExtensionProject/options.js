document.addEventListener("DOMContentLoaded", () => {
  if (!chrome.storage) {
    console.error("chrome.storage is undefined. Are you running this in a Chrome extension?");
    return;
  }

  chrome.storage.sync.get(["geminiApiKey"], (result) => {
    if (result.geminiApiKey) {
      document.getElementById("api-key").value = result.geminiApiKey;
    }
  });

  document.getElementById("save-button").addEventListener("click", () => {
    const apiKey = document.getElementById("api-key").value.trim();
    if (apiKey) {
      chrome.storage.sync.set({ geminiApiKey: apiKey }, () => {
        const successMessage = document.getElementById("success-message");
        successMessage.style.display = "block";
        setTimeout(() => {
          window.close();
        }, 1000);
      });
    }
  });
});
