import React from "react";
import { Button, Box, Heading, HStack, Text } from "@chakra-ui/react";
import { useReactMediaRecorder } from "react-media-recorder";

function RecordVideo() {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true, audio: true });

  const handleRecordingComplete = () => {
    if (mediaBlobUrl) {
      localStorage.setItem("recordedVideoUrl", mediaBlobUrl);
    }
  };
  return (
    <Box w="80%" m="2rem auto">
      <Text>{status == "idle"}</Text>
      <HStack spacing="2" my="2">
        <Button onClick={startRecording} colorScheme="blue" size={"sm"}>
          Start Recording
        </Button>
        {status == "recording" ? (
          <Button onClick={stopRecording} colorScheme="red" size={"sm"}>
            Stop Recording
          </Button>
        ) : null}
        {status === "stopped" && (
          <Button
            colorScheme="green"
            onClick={handleRecordingComplete}
            size="sm"
          >
            Save Recording
          </Button>
        )}
      </HStack>
    </Box>
  );
}

function RecordScreen() {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ screen: true, audio: true });
  const handleRecordingComplete = () => {
    if (mediaBlobUrl) {
      localStorage.setItem("recordedScreenUrl", mediaBlobUrl);
    }
  };

  return (
    <Box w="80%" m="2rem auto">
      <Text>{status == "idle"}</Text>
      <HStack spacing="2" my="2">
        <Button onClick={startRecording} colorScheme="blue" size={"sm"}>
          Start Recording
        </Button>
        {status == "recording" ? (
          <Button onClick={stopRecording} colorScheme="red" size={"sm"}>
            Stop Recording
          </Button>
        ) : null}
        {status === "stopped" && (
          <Button
            colorScheme="green"
            onClick={handleRecordingComplete}
            size="sm"
          >
            Save Recording
          </Button>
        )}
      </HStack>
    </Box>
  );
}

function RecordAudio() {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });
  const handleRecordingComplete = () => {
    if (mediaBlobUrl) {
      localStorage.setItem("recordedAudioUrl", mediaBlobUrl);
    }
  };

  return (
    <Box w="80%" m="2rem auto">
      <Text>{status == "idle"}</Text>
      <HStack spacing="2" my="2">
        <Button onClick={startRecording} colorScheme="blue" size={"sm"}>
          Start Recording
        </Button>
        {status == "recording" ? (
          <Button onClick={stopRecording} colorScheme="red" size={"sm"}>
            Stop Recording
          </Button>
        ) : null}
        {status === "stopped" && (
          <Button
            colorScheme="green"
            onClick={handleRecordingComplete}
            size="sm"
          >
            Save Recording
          </Button>
        )}
      </HStack>
    </Box>
  );
}

function RecordingPage() {
  return (
    <Box w="80%" m="2rem auto">
      <Heading as="h2" size="lg" mb="10px" color="blue.400" textAlign="center">
        Recording Page
      </Heading>
      <HStack>
        <Text color="blue.400" fontWeight="500">
          Video Record
        </Text>
        {RecordVideo()}
      </HStack>
      <HStack>
        <Text color="blue.400" fontWeight="500">
          Scrren Record
        </Text>
        {RecordScreen()}
      </HStack>
      <HStack>
        <Text color="blue.400" fontWeight="500">
          Audio Record
        </Text>
        {RecordAudio()}
      </HStack>
    </Box>
  );
}

export default RecordingPage;
