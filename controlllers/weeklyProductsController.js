var { validationResult, body } = require("express-validator");
var WeeklyProducts = require("../models/WeeklyProducts");

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
        console.log(weekly_products_selling.url, "-----");
        res.redirect("/weekly_products");
      });
    }
  },
];

//weekly products
exports.weekly_products = function (req, res, next) {
  WeeklyProducts.find()
    .sort({ createdAt: "desc" })
    .limit(1)
    .exec((err, weekly_products) => {
      if (err) return next(err);
      res.render("weekly_product_sales", {
        title: weekly_products[0].date_start_formatted,
        weekly_products: weekly_products[0],
        errors: null,
      });
    });
};
