const express = require("express");
const router = express.Router();

const registerController = require("../controllers/auth/signUpController");
const { loginController } = require("../controllers/auth/loginController");

router.route("/signin").post(loginController);
router.route("/register").post(registerController);

module.exports = router;
