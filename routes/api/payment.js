const express = require("express");

const paymentController = require("../../controllers/payment");
const router = express.Router();

router.get("/", paymentController.getAllPayments);
router.post("/", paymentController.postPayment);
router.get("/:paymentId", paymentController.getPaymentById);
// router.get("/edit/:prodSubId",prodSubController.getProSubById);
// router.put("/edit/:prodSubId", prodSubController.postUpdateProduct);

// router.delete("/del/:customerId", customerController.deleteCustomer);

module.exports = router;