import {
  Alert,
  AlertTitle,
  AspectRatio,
  Box,
  Button,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import { GoAlert } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function RecordedVideos() {
  const recordedVideoUrl = localStorage.getItem("recordedVideoUrl");
  const recordedScreenUrl = localStorage.getItem("recordedScreenUrl");
  const recordedAudioUrl = localStorage.getItem("recordedAudioUrl");
  const navigate = useNavigate();

  const handleDelete = (type) => {
    if (type === "video") {
      localStorage.removeItem("recordedVideoUrl");
    } else if (type === "screen") {
      localStorage.removeItem("recordedScreenUrl");
    } else if (type === "audio") {
      localStorage.removeItem("recordedAudioUrl");
    }
    setTimeout(() => {
      navigate("/record");
    }, 2000);
  };

  return (
    <Box w="80%" mt="3rem" mb="1rem" m="auto">
      <Heading as="h2" size="lg" mb="10px" color="blue.400" textAlign="center">
        Recorded Media
      </Heading>
      <SimpleGrid columns={[1, 2, 2]} spacing={10} my="10">
        <Box>
          {recordedVideoUrl ? (
            <AspectRatio maxW="100%" ratio={1}>
              <video
                controls
                src={recordedVideoUrl}
                width="640"
                height="360"
              ></video>
            </AspectRatio>
          ) : (
            <Alert status="error" textAlign={"center"}>
              <GoAlert />
              <AlertTitle ml={2}>No recorded video available!</AlertTitle>
            </Alert>
          )}
        </Box>
        <Box textAlign={["center", "left", "left"]}>
          {recordedVideoUrl && (
            <Button onClick={() => handleDelete("video")} colorScheme="red">
              Delete Video
            </Button>
          )}
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={[1, 2, 2]} spacing={10} my="10">
        <Box>
          {recordedScreenUrl ? (
            <AspectRatio maxW="100%" ratio={1}>
              <video
                controls
                src={recordedScreenUrl}
                width="640"
                height="360"
              ></video>
            </AspectRatio>
          ) : (
            <Alert status="error" textAlign={"center"}>
              <GoAlert />
              <AlertTitle ml={2}>No recorded screen available!</AlertTitle>
            </Alert>
          )}
        </Box>
        <Box textAlign={["center", "left", "left"]}>
          {recordedScreenUrl && (
            <Button onClick={() => handleDelete("screen")} colorScheme="red">
              Delete Screen
            </Button>
          )}
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={[1, 2, 2]} spacing={10} my="10">
        <Box>
          {recordedAudioUrl ? (
            <AspectRatio maxW="100%" ratio={16 / 2}>
              <audio controls src={recordedAudioUrl} width="100px"></audio>
            </AspectRatio>
          ) : (
            <Alert status="error" textAlign={"center"}>
              <GoAlert />
              <AlertTitle ml={2}>No recorded audio available!</AlertTitle>
            </Alert>
          )}
        </Box>
        <Box textAlign={["center", "left", "left"]}>
          {recordedAudioUrl && (
            <Button onClick={() => handleDelete("audio")} colorScheme="red">
              Delete Audio
            </Button>
          )}
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default RecordedVideos;
