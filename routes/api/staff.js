const express = require("express");
const staffController = require("../../controllers/staff")


const router = express.Router();

router.get("/:staffId", staffController.getStaffById);
router.get("/",staffController.getAllStaff );
router.post("/",staffController.postAddStaff);
router.get("/edit/:staffId", staffController.getStaffById);
router.put("/edit/:staffId", staffController.postUpdateStaff);
router.delete("/del/:staffId", staffController.deleteStaff);




module.exports = router;