const express = require("express");
const router = express.Router();

const {
  getProject,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  updateStatus,
} = require("../controllers/ProjectController");

router.post("/", createProject);
router.get("/", getProject);
router.get("/:id", getProjectById);
router.delete("/:id", deleteProject);
router.put("/:id", updateProject);
router.put("/status/:id", updateStatus);

module.exports = router;
