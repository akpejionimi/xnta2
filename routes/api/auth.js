const express = require("express");
const authController = require("../../controllers/auth");
// const authenticate = require("../../middlewares/auth");

const router = express.Router();

router.get("/", authController.getCurrentUser);
router.post("/", authController.postLogin);

module.exports = router; 