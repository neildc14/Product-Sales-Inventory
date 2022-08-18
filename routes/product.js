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
  "/weekly_products/:id",
  productController.product_with_customers_delete
);
router.put("/weekly_products/:id", productController.product_put);

//add miscellaneous
router.get("/weekly_products/add_expenses", miscController.add_misc_get);
router.post("/weekly_products/add_expenses", miscController.add_misc_post);
router.delete("/weekly_products/expenses/:id", miscController.misc_delete);

//view product and post product
router.get("/weekly_products/:id", productController.product_details);
router.post("/weekly_products/:id", customerController.add_customer_post);

//customer
router.get("/customer/:id", customerController.customer_details);
router.delete("/customer/:id", customerController.customer_delete);
router.put("/customer/:id", customerController.customer_put);

//sales history and post product
router.get("/sales_history", weeklyProductsController.sales_history);
router.get(
  "/sales_history/:id",
  weeklyProductsController.weekly_products_details
);
router.delete(
  "/sales_history/:id",
  weeklyProductsController.weekly_products_delete
);
router.post(
  "/sales_history/:id",
  productController.sales_history_add_product_post
);
router.put("/sales_history/:id", weeklyProductsController.sales_history_put);

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
