import React, { useState } from "react";
import { Button, Box, Heading } from "@chakra-ui/react";

function RecordingPage() {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [stream, setStream] = useState(null);

  const startRecording = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true, 
        
      });

      const combinedStream = new MediaStream([
        ...userStream.getTracks(),
        ...screenStream.getTracks(),
      ]);
      setStream(combinedStream);

      const recorder = new MediaRecorder(combinedStream);
      setMediaRecorder(recorder);

      const chunks = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);

        localStorage.setItem("recordedVideoUrl", url);
      };

      recorder.start();
      setRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      stream.getTracks().forEach((track) => track.stop());
      setMediaRecorder(null);
      setRecording(false);
    }
  };

  return (
    <Box w="80%" m="1rem auto">
      <Heading as="h2" size="lg" mb="10px" color="blue.400" textAlign="center">
        Recording Page
      </Heading>
      {recording ? (
        <>
          <p>Recording in progress...</p>
          <Button onClick={stopRecording} colorScheme="blue">
            Stop Recording
          </Button>
        </>
      ) : (
        <Box>
          <Button onClick={startRecording} colorScheme="blue" ml="10px">
            Start Recording
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default RecordingPage;
