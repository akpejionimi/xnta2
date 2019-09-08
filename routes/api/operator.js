const express = require("express");
const operatorController = require("../../controllers/operator")
const router = express.Router();

router.get("/",operatorController.getOperator );
router.post("/",operatorController.postAddStaffAsOperator);

//Admin Routes
// router.get("/",operatorController.getOperator );
// router.post("/",operatorController.postAddStaffAsAdmin);

module.exports = router;