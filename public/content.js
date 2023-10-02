chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startRecordingOnElementClick') {
    if (message.elementSelector) {
      const targetElement = document.querySelector(message.elementSelector);
      if (targetElement) {
        targetElement.addEventListener('click', () => {
          chrome.runtime.sendMessage({ action: 'startRecording' }, (response) => {
            if (response.success) {
              console.log('Recording will start when you click the element.');
            } else {
              console.error('Error:', response.error);
            }
          });
        });
        sendResponse({ success: true });
      } else {
        sendResponse({ success: false, error: 'Element not found' });
      }
    } else {
      sendResponse({ success: false, error: 'Element selector not provided' });
    }
  }
});
