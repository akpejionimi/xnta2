const express = require("express");

const prodSubController = require("../../controllers/prodSub");
const router = express.Router();

router.get("/", prodSubController.getAllProdSubs);
router.post("/", prodSubController.postProdSub);
router.get("/:prodSubId", prodSubController.getProSubById);
router.get("/edit/:prodSubId",prodSubController.getProSubById);
router.put("/edit/:prodSubId", prodSubController.postUpdateProduct);

// router.delete("/del/:customerId", customerController.deleteCustomer);

 
module.exports = router;