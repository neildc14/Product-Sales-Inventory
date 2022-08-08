var express = require("express");
var router = express.Router();
var weeklyProductsController = require("../controllers/weeklyProductsController");
var productController = require("../controllers/productController");
var miscController = require("../controllers/miscController");
var customerController = require("../controllers/customerController");

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

//view product
router.get("/weekly_products/:id/", productController.product_details);
router.post("/weekly_products/:id/", customerController.add_customer_post);

//view customer
router.get("/customer/:id/", customerController.customer_details);

//sales history
router.get("/sales_history", weeklyProductsController.sales_history);
router.get(
  "/sales_history/:id",
  weeklyProductsController.weekly_products_details
);

module.exports = router;
