const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    const userData = req.body;

    const existingUser = await userModel.findOne({ email: userData.email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User with the same email already exists" });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = new userModel({
      ...userData,
      password: hashedPassword,
    });

    const createdUser = await userModel.create(user);

    res
      .status(201)
      .send({ message: "User Registration Successfull", user: createdUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const { _id, name } = user;
    const token = jwt.sign({ userId: _id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({
      message: "Login successful",
      user: { _id, name, email: user.email },
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let apiData = await userModel.find();
    res.status(201).send({ data: apiData, total: apiData.length });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { createUser, login, getAllUsers, getUserById };
