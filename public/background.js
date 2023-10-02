// chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
//   if (request.action === 'startRecording') {
//     try {
//       const constraints = {
//         video: true,
//         audio: true, 
//       };

//       const stream = await navigator.mediaDevices.getDisplayMedia(constraints);

//       chrome.tabs.sendMessage(sender.tab.id, { action: 'recordingStarted', stream });

//       sendResponse({ success: true });
//     } catch (error) {
//       sendResponse({ success: false, error: error.message });
//     }
//   }
// });


chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'startRecording') {
    try {
      // You can start the media recorder here using request.stream
      const mediaRecorder = new MediaRecorder(request.stream, {
        mimeType: 'video/webm',
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(recordedChunksRef.current, {
          type: 'video/webm',
        });

        saveData({
          recordedVideo: recordedBlob,
        });
        setShowRecording(false);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setShowRecording(true);

      sendResponse({ success: true });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }
});
