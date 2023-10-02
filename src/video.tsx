import React, { useState, useEffect, useRef } from "react";
import { saveAs } from "file-saver";

const ScreenRecorder: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showRecording, setShowRecording] = useState<boolean>(false);
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(false);
  const [microphoneEnabled, setMicrophoneEnabled] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraVideoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    if (stream && cameraVideoRef.current) {
      cameraVideoRef.current.srcObject = cameraEnabled ? stream : null;
    }
  }, [stream]);



  const startRecording = async (): Promise<void> => {
    try {
      const constraints: MediaStreamConstraints = {
        video: true,
        audio: microphoneEnabled,
      };

      const userMediaStream = await navigator.mediaDevices.getDisplayMedia(
        constraints
      );

      setStream(userMediaStream);

      const mediaRecorder = new MediaRecorder(userMediaStream, {
        mimeType: "video/webm",
      });

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        });

        saveData({
          recordedVideo: recordedBlob,
        });
        setShowRecording(false);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setShowRecording(true);
    } catch (error) {
      console.error("Error accessing screen:", error);
    }
  };
  
  // const startRecording = () => {
  //   chrome.runtime.sendMessage({ action: 'startRecording' }, (response) => {
  //     if (response.success) {
  //       console.log('Recording started successfully.');
  //     } else {
  //       console.error('Error starting recording:', response.error);
  //     }
  //   });
  // };


  // const startRecording = () => {
  //   if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
  //     const elementSelector = 'div[class^="flex"]:contains("Start Recording")';
  
  //     chrome.runtime.sendMessage(
  //       { action: 'startRecordingOnElementClick', elementSelector },
  //       (response) => {
  //         if (response.success) {
  //           console.log('Recording will start when you click the element.');
  //         } else {
  //           console.error('Error:', response.error);
  //         }
  //       }
  //     );
  //   } else {
  //     console.warn("chrome.runtime.sendMessage is not available.");
  //   }
  // };
  
  
  // const startRecording = async () => {
  //   try {
  //     const constraints = {
  //       video: true,
  //       audio: microphoneEnabled,
  //     };
  
  //     // Request permission for screen and audio capture
  //     const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
  
  //     // Send a message to the background script to start recording with the granted stream
  //     chrome.runtime.sendMessage({ action: 'startRecording', stream }, (response) => {
  //       if (response.success) {
  //         console.log('Recording started successfully.');
  //         setStream(stream); // Update the state with the granted stream
  //       } else {
  //         console.error('Error starting recording:', response.error);
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error accessing screen:', error);
  //   }
  // };
  
  
  
  
  // useEffect(() => {
  //   // Check if we're in a Chrome extension context
  //   if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
  //     // Add your message listener here
  //     chrome.runtime.onMessage.addListener((message, sender) => {
  //       if (message.action === "recordingStarted") {
  //         console.log(sender.tab);
  //         setStream(message.stream);
  //         startMediaRecorder(message.stream);
  //       }
  //     });
  //   } else {
  //     // Handle the case where the chrome.runtime API is not available (e.g., during local development)
  //     console.warn("chrome.runtime.onMessage is not available.");
  //   }
  // }, []);


  // const startMediaRecorder = (stream: MediaStream) => {
  //   try {
  //     const mediaRecorder = new MediaRecorder(stream, {
  //       mimeType: "video/webm",
  //     });
  
  //     mediaRecorder.ondataavailable = (event: BlobEvent) => {
  //       if (event.data.size > 0) {
  //         recordedChunksRef.current.push(event.data);
  //       }
  //     };
  
  //     mediaRecorder.onstop = () => {
  //       const recordedBlob = new Blob(recordedChunksRef.current, {
  //         type: "video/webm",
  //       });
  
  //       saveData({
  //         recordedVideo: recordedBlob,
  //       });
  //       setShowRecording(false);
  //     };
  
  //     mediaRecorderRef.current = mediaRecorder;
  //     mediaRecorder.start();
  //     setShowRecording(true);
  
  //     // You can add UI feedback here to indicate that recording has started
  //   } catch (error) {
  //     console.error("Error starting media recorder:", error);
  //   }
  // };
  

  // const stopRecording = () => {
  //   try {
  //     if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
  //       mediaRecorderRef.current.stop();
  //     } else {
  //       console.warn('MediaRecorder is not in recording state.');
  //     }
  
  //     // After stopping the recording, save the video
  //     if (recordedChunksRef.current.length > 0) {
  //       const recordedBlob = new Blob(recordedChunksRef.current, {
  //         type: 'video/webm',
  //       });
  
  //       saveData({
  //         recordedVideo: recordedBlob,
  //       });
  //     } else {
  //       console.warn('No recorded data available.');
  //     }
  //   } catch (error) {
  //     console.error('Error stopping media recorder:', error);
  //   }
  // };
  

  const saveData = (data: any): void => {
    console.log("Data to save:", data);
    saveAs(data.recordedVideo, "recorded-screen.webm");
  };

  return (
    <div>
      {showRecording && stream && (
        <div>
          <h2>Screen Recording</h2>
          {cameraEnabled && (
            <div>
              <h2>Camera View</h2>
            </div>
          )}
        </div>
      )}
      <div className="w-[60rem] flex items-center flex-col p-[1.5rem] shadow-3xl">
        <div className="flex items-center justify-between mb-1rem">
          <div className="flex gap-[0.5rem] items-center">
            <img src="./v.svg" alt="help-logo" />
            <p className="font-[Sora] font-bold text-[#120B48]">HelpMeOut</p>
          </div>
          <div className="flex items-center gap-[0.75rem]">
            <img src="./set.svg" alt="" />
            <img src="./close.svg" alt="" className="cursor-pointer" />
          </div>
        </div>
        <p className="font-['Work_Sans'] font-normal text-[0.875rem] text-[#413C6D] max-w-[14.0625rem] w-full mb-2rem leading-normal">
          This extension helps you record and share help videos with ease.
        </p>
        <div className="max-w-[15.75rem] w-full pr-2rem pl-2rem mb-[1.5rem]">
          <div className="max-w-[11.8rem] flex justify-between items-center mx-auto">
            <div className="flex justify-center items-center flex-col gap-[0.5rem]">
              <img src="./screen.svg" alt="" />
              <p className="text-[#928FAB] font-['Work_Sans'] text-[0.875rem] font-medium">
                Full Screen
              </p>
            </div>
            <div className="flex justify-center items-center gap-[0.5rem] flex-col">
              <img src="./tab.svg" alt="" />
              <p className="text-[#413C6D] font-['Work_Sans'] text-[0.875rem] font-semibold">
                Current Tab
              </p>
            </div>
          </div>
        </div>
        <div className="p-[0.75rem] pl-[1rem] max-w-[15.75rem] w-full mb-[1.5rem] border-2 border-primary-600 rounded-[0.75rem]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-[0.5rem]">
              <img src="./cam.svg" alt="" />
              <p className="text-[#100A42] font-['Work_Sans'] font-semibold text-[0.875rem]">
                Camera
              </p>
            </div>
            <img
              src={`${cameraEnabled ? "./t-on.svg" : "./t-off.png"}`}
              className="cursor-pointer"
              alt=""
              onClick={() => setCameraEnabled(!cameraEnabled)}
            />
          </div>
        </div>
        <div className="p-[0.75rem] pl-[1rem] max-w-[15.75rem] w-full mb-[1.5rem] border-2 border-primary-600 rounded-[0.75rem]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-[0.5rem]">
              <img src="./audio.svg" alt="" />
              <p className="text-[#100A42] font-['Work_Sans'] font-semibold text-[0.875rem]">
                Audio
              </p>
            </div>
            <img
              src={`${microphoneEnabled ? "./t-on.svg" : "./t-off.png"}`}
              className="cursor-pointer"
              onClick={() => setMicrophoneEnabled(!microphoneEnabled)}
            />
          </div>
        </div>
        <div
          onClick={startRecording}
          className="flex justify-center items-center rounded-[0.75rem] bg-[#120B48] hover:bg-[#928FAB] mb-1rem p-1rem text-[#FAFDFF] text-1rem font-['Work_Sans'] font-medium cursor-pointer"
        >
          Start Recording
        </div>
        {/* <div
          onClick={stopRecording}
          className="flex justify-center items-center rounded-[0.75rem] bg-[#120B48] hover:bg-[#928FAB] p-1rem text-[#FAFDFF] text-1rem font-['Work_Sans'] font-medium cursor-pointer"
        >
          Stop Recording
        </div> */}
      </div>
    </div>
  );
};

export default ScreenRecorder;
