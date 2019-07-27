const express = require("express");
const staffController = require("../../controllers/staff")
const router = express.Router();

router.get("/:staffId", staffController.getStaffById);
router.get("/",staffController.getStaff );
router.post("/",staffController.postAddStaff);


module.exports = router;