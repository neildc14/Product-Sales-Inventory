var { validationResult, body } = require("express-validator");
var Product = require("../models/Product");
var Customer = require("../models/Customer");
var async = require("async");

exports.index_get = function (req, res, next) {
  res.render("index", {
    title: " Sales Inventory",
  });
};

exports.add_product_post = [
  body("weekly_product").isLength({ min: 1 }).trim().escape(),
  [body("product_name").toLowerCase().isLength({ min: 1 }).trim().escape()],
  body("quantity").isLength().trim().escape(),
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

exports.product_details = function (req, res, next) {
  Product.findById(req.params.id).exec(function (err, product) {
    if (err) {
      return next(err);
    }
    Customer.find({ product_ordered: product._id })
      .sort({ customer_name: "asc" })
      .exec(function (err, customers) {
        if (err) {
          return next(err);
        }
        console.log(customers);
        res.render("product_details", {
          title: "Product Details",
          product: product,
          customers: customers,
          errors: null,
        });
      });
  });
};
