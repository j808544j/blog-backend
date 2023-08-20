const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const validateRegistration = require("../middleware/authenticate");
const validateLogin = require("../middleware/expressValidator/validateLogin");

router.post("/register", validateRegistration, userController.register);
router.post("/login", validateLogin, userController.login);

module.exports = router;
