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
router.post("/weekly_products", productController.add_product_post);
router.delete(
  "/weekly_products",
  weeklyProductsController.product_with_customers_delete
);

//add miscellaneous
router.get("/weekly_products/add_expenses", miscController.add_misc_get);
router.post("/weekly_products/add_expenses", miscController.add_misc_post);

//view product and post product
router.get("/weekly_products/:id/", productController.product_details);
router.post("/weekly_products/:id/", customerController.add_customer_post);

//customer
router.get("/customer/:id", customerController.customer_details);
router.get("/customer/:id/delete", customerController.customer_delete_get);
router.delete("/customer/:id/delete", customerController.customer_delete_post);

//sales history and post product
router.get("/sales_history", weeklyProductsController.sales_history);
router.get(
  "/sales_history/:id",
  weeklyProductsController.weekly_products_details
);
router.post(
  "/sales_history/:id",
  productController.sales_history_add_product_post
);

router.get(
  "/sales_history/:id/add_expenses",
  miscController.sales_history_add_misc_get
);
router.post(
  "/sales_history/:id/add_expenses",
  miscController.sales_history_add_misc_post
);

//customer ledger
router.get("/customer_ledger", customerController.customer_ledger);
router.get("/customer_ledger/:id", customerController.customer_ledger_details);

module.exports = router;
