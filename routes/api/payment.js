const express = require("express");

const paymentController = require("../../controllers/payment");
const router = express.Router();

router.get("/", paymentController.getAllPayments);
router.post("/:customerId", paymentController.postPayment);
router.get("/:customerId", paymentController.getPaymentById);
router.get("/sum/:customerId", paymentController.getSumPaymentById);
// router.get("/edit/:prodSubId",prodSubController.getProSubById);
// router.put("/edit/:prodSubId", prodSubController.postUpdateProduct);

// router.delete("/del/:customerId", customerController.deleteCustomer);

module.exports = router;