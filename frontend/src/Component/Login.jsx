import React, { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Heading,
  Text,
  FormControl,
  FormLabel,
  useToast,
  InputGroup,
  InputLeftElement,
  Button,
  InputRightElement,
  Avatar,
  Stack,
  Image,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../Redux/actiontypes/auth.types";
import { authlogin } from "../Redux/action/auth.action";
import { FaUserAlt } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import Loading from "./Loading";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let { email, password } = form;
    if (email && password) {
      dispatch(
        authlogin({
          email: email,
          password: password,
        })
      ).then((res) => {
        setIsLoading(false);
        if (res === LOGIN_SUCCESS) {
          navigate("/record", { replace: true });
        } else {
          toast({
            description: "Invalid email or password. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      });
    } else {
      setIsLoading(false);
      toast({
        description: "Please enter your email and password.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Flex
          justifyContent="center"
          alignItems="center"
          gap="5rem"
          p="10px"
          m="auto"
          mt="1rem"
        >
          <Box
            display={{ base: "none", md: "block" }}
            w="50%"
            h="100%"
            p="50px"
          >
            <Image
              borderRadius={"20px"}
              alt={"Login Image"}
              objectFit={"cover"}
              src={
                "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
              }
            />
          </Box>

          <Box w={{ base: "98%", md: "40%" }} p="30px" borderRadius="10px">
            <Heading
              as="h2"
              size="lg"
              mb="10px"
              color="blue.400"
              textAlign="center"
            >
              Login to Account
            </Heading>
            <Stack
              flexDir="column"
              mb="2"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar bg="blue.500" textAlign="center" />
            </Stack>

            <form action="" onSubmit={handelSubmit}>
              <FormControl isRequired>
                <FormLabel fontSize="12px">Email</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaUserAlt color="gray" />}
                  />
                  <Input
                    onChange={(e) => handelChange(e)}
                    type="email"
                    name="email"
                    value={form.email}
                    placeholder="Enter email"
                    required
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired mt="20px">
                <FormLabel fontSize="12px">Password</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<AiFillLock color="gray" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => handelChange(e)}
                    name="password"
                    value={form.password}
                    required
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Input
                w="full"
                fontWeight="bold"
                bg="blue.500"
                _hover={{ bg: "blue.600" }}
                color="white"
                mt="20px"
                type="submit"
                value="Login"
                cursor="pointer"
              />
            </form>
            <Box mt="10px">
              <Text color="gray.900">
                New to us ?
                <Link to="/signup">
                  <Text as="b" color="teal">
                    &nbsp; Signup
                  </Text>
                </Link>
              </Text>
            </Box>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default Login;
