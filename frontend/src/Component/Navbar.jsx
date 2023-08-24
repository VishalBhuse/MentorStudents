import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  useColorModeValue,
  Image,
  useDisclosure,
  VStack,
  HStack,
  Button,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import React from "react";
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../Redux/actiontypes/auth.types";

export default function Navbar() {
  const dispatch = useDispatch();
  const { isOpen, onToggle } = useDisclosure();
  const { isAuth, userdata } = useSelector((state) => state.auth);
  const use = useSelector((state) => state.auth);
  console.log(use);

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 99, height: "75px" }}>
      <Box>
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <MdClose w={3} h={3} />
                ) : (
                  <GiHamburgerMenu w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Link to={"/"}>
              <Image
                src="https://mentorstudents.org/images/LogoBlue.png"
                height={"60px"}
                width="90%"
              ></Image>
            </Link>

            <Flex
              display={{ base: "none", md: "flex" }}
              ml={10}
              alignItems={"center"}
            >
              <DesktopNav />
            </Flex>
          </Flex>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={4}
            alignItems={"center"}
            fontSize="20px"
            mr="10px"
          >
            <Link to="/">
              {!isAuth ? (
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"blue.600"}
                  _hover={{
                    bg: "blue.700",
                  }}
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"red.500"}
                  _hover={{
                    bg: "red.600",
                  }}
                  onClick={() => {
                    dispatch({ type: LOGOUT });
                  }}
                >
                  Log-Out
                </Button>
              )}
            </Link>
            <Link to="/signup">
              {!isAuth && (
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"blue.600"}
                  _hover={{
                    bg: "blue.700",
                  }}
                >
                  Sign Up
                </Button>
              )}
            </Link>
            {isAuth && (
              <HStack>
                <Avatar name={userdata?.name}>
                  <AvatarBadge boxSize="1rem" bg="green.500" />
                </Avatar>
                <VStack
                  fontSize={"14px"}
                  alignItems="flex-start"
                  fontWeight={"500"}
                  spacing="0"
                >
                  <Text>{userdata?.name}</Text>
                  <Text>{userdata?.email}</Text>
                </VStack>
              </HStack>
            )}
          </Stack>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
        <br />
      </Box>
    </div>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4}>
      <Box>
        <HStack spacing={"25px"} alignItems="center">
          <Link to={"/record"}>
            <Text
              fontSize={"15px"}
              fontWeight={"500"}
              _hover={{
                fontSize: "15px",
                borderBottom: "1px solid red",
              }}
            >
              RecordingPage
            </Text>
          </Link>
          <Link to={"/video"}>
            <Text
              fontSize={"15px"}
              fontWeight={"500"}
              border="1px inherit"
              _hover={{
                fontSize: "15px",
                borderBottom: "1px solid red",
              }}
            >
              Video
            </Text>
          </Link>
        </HStack>
      </Box>
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      <Box>
        <VStack fontWeight={"600"}>
          <Link to={"/record"}>RecordingPage</Link>
          <Link to={"/video"}>Video</Link>
          <Link to={"/"}>Sign In</Link>
          <Link to={"/signup"}>Sign Up</Link>
        </VStack>
      </Box>
    </Stack>
  );
};
