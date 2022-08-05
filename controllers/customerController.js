var { validationResult, body } = require("express-validator");
var Customer = require("../models/Customer");
var Product = require("../models/Product");
var async = require("async");

exports.add_customer_post = [
  body("product_ordered").isLength({ min: 1 }).trim().escape(),
  body("total_purchased").isLength({ min: 1 }).trim().escape(),
  [body("customer_name").toLowerCase().isLength({ min: 1 }).trim().escape()],
  body("address").isLength({ min: 1 }).trim().escape(),
  body("quantity_ordered").isLength({ min: 1 }).trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("product_details", {
        title: "Product Details",
        product: product,
        errors: errors.array(),
      });
      console.log(errors.array());
      return;
    } else {
      const new_customer = new Customer({
        customer_name: req.body.customer_name,
        address: req.body.address,
        quantity_ordered: req.body.quantity_ordered,
        product_ordered: req.body.product_ordered,
        total_purchased: req.body.total_purchased,
      });

      console.log(new_customer);
      new_customer.save((err) => {
        if (err) {
          return next(err);
        }
        const product_id = new_customer.product_ordered;
        res.redirect(`/weekly_products/${product_id}`);
      });
    }
  },
];

exports.customer_details = function (req, res, next) {
  Customer.findById(req.params.id).exec(function (err, customer) {
    if (err) {
      return next(err);
    }
    Product.findById(customer.product_ordered)
      .sort({ product_name: "asc" })
      .exec(function (err, product) {
        if (err) {
          return next(err);
        }
        res.render("customer_details", {
          title: "Customer Details",
          customer: customer,
          product: product,
        });
      });
  });
};
