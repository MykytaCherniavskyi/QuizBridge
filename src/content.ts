console.log('Content script loaded');

// Example of message passing between content script and background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_PAGE_DATA') {
    const data = {
      title: document.title,
      url: window.location.href,
    };
    sendResponse(data);
  }
  return true;
});

// Example of DOM manipulation
function injectReactApp() {
  const container = document.createElement('div');
  container.id = 'chrome-extension-root';
  document.body.appendChild(container);
}

// Example of message passing to background script
function sendToBackground(data: unknown) {
  chrome.runtime.sendMessage({ type: 'FROM_CONTENT', data });
}

// Initialize content script
function init() {
  // Add your initialization code here
  console.log('Content script initialized');
}

init(); 