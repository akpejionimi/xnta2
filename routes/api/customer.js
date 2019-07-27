const express = require("express");
const route = express.Router();

const customerController = require("../../controllers/customer");

route.get("/", customerController.getAllCustomer);
route.post("/", customerController.postAddCustomers);

route.get("/:customerId", customerController.getCustomerById);
route.get("/edit/:customerId", customerController.getCustomerById);
route.put("/edit/:customerId",customerController.postUpdateCustomer);
route.delete("/del/:customerId",customerController.deleteCustomer);


module.exports = route;