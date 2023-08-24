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
  const navigate = useNavigate();

  return (
    <Box w="80%" mt="3rem" mb="1rem" m="auto">
      <Heading as="h2" size="lg" mb="10px" color="blue.400" textAlign="center">
        Recorded Videos
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
            <Button
              onClick={() => {
                localStorage.removeItem("recordedVideoUrl");
                navigate("/record");
              }}
              colorScheme="red"
            >
              Delete Recording
            </Button>
          )}
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default RecordedVideos;
