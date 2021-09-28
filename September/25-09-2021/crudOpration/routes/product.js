const router = require('express').Router();
const product = require('../bin/model/product');
const {product_all, add_product} = require("../controllers/product-contro");   

router.post("/");
router.get("/products", product_all);
router.get("/:product-id");
router.post("/", add_product)
router.put("/:product-id");
router.delete("/:product-id");

module.exports = router;