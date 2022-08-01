var express = require("express");
var router = express.Router();
var weeklyProductsController = require("../controlllers/weeklyProductsController");
var productController = require("../controlllers/productController");

//home
router.get("/", productController.index_get);

//add weekly product sales
router.get(
  "/add_weekly_product_sales",
  weeklyProductsController.add_weekly_product_sales_get
);
router.post(
  "/add_weekly_product_sales",
  weeklyProductsController.add_weekly_product_sales_post
);

//weekly_product_sales
router.get("/weekly_products", weeklyProductsController.weekly_products);

//add products
router.post("/weekly_products", productController.add_product_post);

module.exports = router;
