const express = require("express");

const savingsProductController = require("../../controllers/savingsProduct");
const router = express.Router();

router.get("/", savingsProductController.getAllSavingsProducts);
router.post("/", savingsProductController.postAddSavingsProducts);

router.get("/:productId", savingsProductController.getSavingsProductById);
router.get("/edit/:customerId", savingsProductController.getSavingsProductById);
router.put("/edit/:customerId", savingsProductController.postUpdateSavingsProduct);
router.delete("/del/:customerId", savingsProductController.deleteSavingsProduct);


module.exports = router;