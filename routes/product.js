var express = require("express");
var router = express.Router();
var weeklyProductsController = require("../controllers/weeklyProductsController");
var productController = require("../controllers/productController");
var miscController = require("../controllers/miscController");
//home
router.get("/", productController.index_get);

//weekly product sales
router.get(
  "/add_weekly_product_sales",
  weeklyProductsController.add_weekly_product_sales_get
);
router.post(
  "/add_weekly_product_sales",
  weeklyProductsController.add_weekly_product_sales_post
);

//weekly_products
router.get("/weekly_products", weeklyProductsController.weekly_products);

//add products
router.post("/weekly_products", productController.add_product_post);

//add miscellaneous
router.get("/weekly_products/add_expenses", miscController.add_misc_get);
router.post("/weekly_products/add_expenses", miscController.add_misc_post);

module.exports = router;
