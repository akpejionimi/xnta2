const express = require("express");
const staffController = require("../../controllers/staff")
const customerContrl = require ('../../controllers/customer')

const router = express.Router();

router.get("/:staffId", staffController.getStaffById);
router.get("/",staffController.getStaff );
router.post("/",staffController.postAddStaff);
router.get("/edit/:staffId", staffController.getStaffById);
router.put("/edit/:staffId", customerContrl.postUpdateStaff);




module.exports = router;