const express = require("express");
const router = express.Router();
const loginController =require("../controllers/login")

router.post("/", loginController.login);
router.get("/logout", loginController.logout);
router.get("/getLoggedUser", loginController.getLoggedUser);


module.exports = router;
