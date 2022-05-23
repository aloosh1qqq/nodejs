const productController = require("../controllers/product.controller");
const express = require('express');
const router = express.Router();

router.post("/products", productController.create);
router.get("/products", productController.findAll);
router.get("/products/:Id", productController.findOne);
router.put("/products/:Id", productController.update);
router.delete("/products/:Id", productController.delete);

module.exports = router;