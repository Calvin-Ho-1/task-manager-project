const express = require("express");

const tasksRouter = express.Router();

tasksRouter.get("/tasks", (req, res) => res.send("All Tasks"));

tasksRouter.post("/tasks", (req, res) => res.send("Create a new Task"));

module.exports = tasksRouter;