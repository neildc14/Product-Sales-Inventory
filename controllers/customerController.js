var { validationResult, body } = require("express-validator");
var mongoose = require("mongoose");
var Customer = require("../models/Customer");
var Product = require("../models/Product");
var WeeklyProducts = require("../models/WeeklyProducts");

exports.add_customer_post = [
  body("weekly_product").isLength({ min: 1 }).trim().escape(),
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
        errors: errors.array(),
        customer_reset: req.body,
      });
      console.log(errors.array());
      return;
    } else {
      const new_customer = new Customer({
        weekly_product: req.body.weekly_product,
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

exports.customer_ledger = function (req, res, next) {
  WeeklyProducts.find()
    .sort({ createdAt: "desc" })
    .exec(function (err, results) {
      if (err) {
        return next(err);
      }
      if (results === null) {
        var err = new Error("Weekly Sales Product not found");
        err.status = 404;
        return next(err);
      }

      res.render("customer_ledger", {
        title: "Customer Ledger",
        all_weekly_product_sales: results,
      });
    });
};

exports.customer_ledger_details = function (req, res, next) {
  WeeklyProducts.findById(req.params.id).exec(function (err, weekly_product) {
    if (err) {
      return next(err);
    }
    Customer.find({ weekly_product: weekly_product._id }).exec(function (
      err,
      customers
    ) {
      if (err) {
        return next(err);
      }
      console.log(customers);
      res.render("customer_ledger_details", {
        title: "Customer Lists",
        customers: customers,
      });
    });
  });
};

exports.customer_delete = function (req, res, next) {
  const id = req.params.id;
  Customer.findById(id).exec(function (err, customer) {
    if (err) {
      return next(err);
    }

    Product.findById(customer.product_ordered)
      .sort({ product_name: "asc" })
      .exec(function (err, product) {
        if (err) {
          return next(err);
        }

        Customer.findByIdAndRemove(id)
          .then((result) => {
            console.log(result);
            res.json({ redirect: product.url });
          })
          .catch((err) => {
            return next(err);
          });
      });
  });
};
