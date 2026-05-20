const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const {createTask, getTasks, updateTaskStatus, dashboard} = require("../controllers/taskController");

router.post("/", auth, authorize(["Admin"]), createTask);

router.get("/", auth, getTasks);

router.get( "/dashboard", auth, dashboard);

router.patch("/:id/status", auth, updateTaskStatus);

module.exports = router;