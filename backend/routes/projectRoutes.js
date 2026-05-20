const express = require("express");

const router =express.Router();

const auth = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const {createProject, addMember, getProjects, deleteProject}= require("../controllers/projectController");

router.post("/", auth, authorize(["Admin"]), createProject);

router.get("/", auth, getProjects);

router.post("/add-member", auth, authorize(["Admin"]), addMember);

router.delete("/:id", auth, authorize(["Admin"]), deleteProject);
module.exports = router;