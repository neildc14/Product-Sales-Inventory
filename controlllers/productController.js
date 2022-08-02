var { validationResult, body } = require("express-validator");
var Product = require("../models/Product");

exports.index_get = function (req, res, next) {
  res.render("index", {
    title: " Sales Inventory",
  });
};

exports.add_product_post = [
  body("weekly_product").isLength({ min: 1 }).trim().escape(),
  [body("product_name").toLowerCase().isLength({ min: 1 }).trim().escape()],
  body("quantity").isLength({ min: 1 }).trim().escape(),
  body("original_price").isLength({ min: 1 }).trim().escape(),
  body("selling_price").isLength({ min: 1 }).trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("weekly_product_sales", {
        title: "Add Product",
        errors: errors.array(),
      });
      console.log(errors.array());
      return;
    } else {
      const new_product = new Product({
        weekly_product: req.body.weekly_product,
        product_name: req.body.product_name,
        quantity: req.body.quantity,
        original_price: req.body.original_price,
        selling_price: req.body.selling_price,
      });
      console.log(new_product);
      new_product.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/weekly_products");
      });
    }
  },
];
