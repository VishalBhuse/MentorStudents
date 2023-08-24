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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handelSubmit = async () => {
    console.log(form);
    if (form.name !== "" && form.email !== "" && form.password !== "") {
      try {
        const response = await axios.post(
          `https://mentor-students.vercel.app/api/register`,
          form
        );

        if (response.data.message === "User Registration Successfull") {
          toast({
            description: response.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-center",
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else if (
          response.data.message === "User with the same email already exists"
        ) {
          toast({
            description: "User already exists with the provided email.",
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-center",
          });
        } else {
          toast({
            description: response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-center",
          });
        }
      } catch (error) {
        toast({
          description: "User with the same email already exists.",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-center",
        });
      }
    } else {
      toast({
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-center",
      });
    }
  };

  return (
    <Flex
      justifyContent="center"
      gap="5rem"
      alignItems="center"
      p="10px"
      m="auto"
      my="1rem"
    >
      <Box
        display={{ base: "none", md: "block" }}
        w="40%"
        h="500px"
        p="50px"
        borderRadius={"20px"}
        bg={`url(https://t3.ftcdn.net/jpg/05/65/46/48/360_F_565464881_20xX2xgiQ0UAeKZeHbFwArcD9DYOJsEi.jpghttps://t3.ftcdn.net/jpg/05/65/46/48/360_F_565464852_JoSSg4Tcag8U0AMkEXt7VgoHvZRIgBRT.jpg)`}
      >
        <Heading color="teal.400" mb="sm">
          Welcome
        </Heading>
      </Box>
      <Box w={{ base: "98%", md: "40%" }} p="30px" borderRadius="10px">
        <Heading
          as="h2"
          size="lg"
          mb="10px"
          textAlign="center"
          color="blue.400"
        >
          Create an Account
        </Heading>

        <FormControl isRequired>
          <FormLabel fontSize="12px">Name</FormLabel>
          <Input
            onChange={handleChange}
            type="text"
            name="name"
            value={form.name}
            placeholder="Enter your full name"
            required
            autoComplete="off"
          />
        </FormControl>
        <FormControl isRequired mt="20px">
          <FormLabel fontSize="12px">Email</FormLabel>
          <Input
            onChange={handleChange}
            type="email"
            name="email"
            value={form.email}
            placeholder="Enter email"
            required
            autoComplete="off"
          />
        </FormControl>
        <FormControl isRequired mt="10px">
          <FormLabel fontSize="12px">Password</FormLabel>
          <Input
            onChange={handleChange}
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter password"
            required
            autoComplete="off"
          />
        </FormControl>
        <Input
          w="full"
          onClick={handelSubmit}
          fontWeight="bold"
          bg="blue.500"
          _hover={{ bg: "blue.600" }}
          color="white"
          mt="20px"
          type="submit"
          cursor={"pointer"}
        />

        <Box mt="10px">
          <Text color="gray.900">
            Already have an account?{" "}
            <Link to="/">
              <Text as="b" color="teal">
                Login
              </Text>
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Signup;
