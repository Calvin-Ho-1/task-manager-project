const express = require("express");
const userController = require("./user.controller.js");

const userRouter = express.Router();

userRouter.post("/create", userController.handleCreateUser);

module.exports = userRouter;
