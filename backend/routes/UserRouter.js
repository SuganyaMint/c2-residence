const express = require("express");
const router = express.Router();

const {
  register,
  getUser,
  getUserByUserName,
  delelteUserById,
  editUser,
} = require("../controllers/UserController");

router.post("/register", register);
router.get("/", getUser);
router.get("/:userName", getUserByUserName);
router.delete("/:id", delelteUserById);
router.put("/:id", editUser);

module.exports = router;
