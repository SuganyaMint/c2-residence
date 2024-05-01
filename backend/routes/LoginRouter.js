const express = require("express");

const router = express.Router();

const { login, authen } = require("../controllers/LoginController");

router.post("/", login);
router.get("/authen", authen);

module.exports = router;


