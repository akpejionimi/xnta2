const express = require("express");

const customerController = require("../../controllers/customer");
const router = express.Router();

router.get("/", customerController.getAllCustomer);
router.post("/", customerController.postAddCustomers);

router.get("/:customerId", customerController.getCustomerById);
router.get("/edit/:customerId", customerController.getCustomerById);
router.put("/edit/:customerId", customerController.postUpdateCustomer);
router.delete("/del/:customerId", customerController.deleteCustomer);


module.exports = router;