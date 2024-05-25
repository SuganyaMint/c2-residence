const express = require("express");

const router = express.Router();

const { login, authen, logout, getHistory } = require("../controllers/LoginController");

router.post("/", login);
router.get("/authen", authen);
router.put("/logout/:userName", logout);
router.get("/history", getHistory);


module.exports = router;


