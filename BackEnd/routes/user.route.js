const express = require("express");
const asyncHandler = require("express-async-handler");
const userController = require("../controller/user.controller");
const userRouter = express.Router();

userRouter.post("/register", asyncHandler(userController.createUser));

userRouter.post("/login", asyncHandler(userController.login));

userRouter.get("/userall", asyncHandler(userController.getAllUsers));

userRouter.get("/user/:userId", asyncHandler(userController.getUserById));


module.exports = userRouter;
