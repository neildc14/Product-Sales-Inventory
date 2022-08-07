var { validationResult, body } = require("express-validator");
var WeeklyProducts = require("../models/WeeklyProducts");
var Product = require("../models/Product");
var Miscellaneous = require("../models/Miscellaneous");
var Customer = require("../models/Customer");
var async = require("async");

exports.add_weekly_product_sales_get = function (req, res, next) {
  res.render("add_weekly_products_sales", {
    title: "Add Weekly Product",
    errors: null,
  });
};

exports.add_weekly_product_sales_post = [
  body("date_start", "Empty Date").isISO8601().toDate(),
  body("date_end", "Empty Date").isISO8601().toDate(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add_weekly_products_sales", {
        title: "Add Weekly Product",
        weekly_products_selling: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      const weekly_products_selling = new WeeklyProducts({
        date_start: req.body.date_start,
        date_end: req.body.date_end,
      });

      weekly_products_selling.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/weekly_products");
      });
    }
  },
];

exports.weekly_products = function (req, res, next) {
  WeeklyProducts.find()
    .sort({ createdAt: "desc" })
    .limit(1)
    .exec(function (err, results) {
      if (err) {
        return next(err);
      }
      async
        .parallel({
          product: function (callback) {
            Product.find({ weekly_product: results[0]._id })
              .sort({ product_name: "asc" })
              .exec(callback);
          },
          miscellaneous: function (callback) {
            Miscellaneous.find({ weekly_product: results[0]._id })
              .sort({ product_name: "asc" })
              .exec(callback);
          },
          customer: function (callback) {
            Customer.find().sort({ createdAt: "asc" }).exec(callback);
          },
        })
        .then(function (asyncresults) {
          res.render("weekly_product_sales", {
            title: "Weekly Sales",
            weekly_product_sales: results[0],
            products: asyncresults.product,
            miscellaneous: asyncresults.miscellaneous,
            customers: asyncresults.customer,
            errors: null,
          });
        })
        .catch((err) => {
          return next(err);
        });
    });
};
