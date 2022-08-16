var { validationResult, body } = require("express-validator");
var Miscellaneous = require("../models/Miscellaneous");
var WeeklyProducts = require("../models/WeeklyProducts");

exports.add_misc_get = function (req, res, next) {
  WeeklyProducts.find()
    .sort({ createdAt: "desc" })
    .limit(1)
    .exec(function (err, results) {
      if (err) {
        return next(err);
      }

      res.render("expenses", {
        title: "Add Expenses",
        weekly_product_sales: results[0],
        errors: null,
        misc_reset: undefined,
      });
    });
};

exports.add_misc_post = [
  body("weekly_product_misc").isLength({ min: 1 }).trim().escape(),
  [body("misc_name").toLowerCase().isLength({ min: 1 }).trim().escape()],
  body("amount").isLength({ min: 1 }).trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("expenses", {
        title: "Add Expenses",
        weekly_product_sales: results[0],
        errors: errors.array(),
        misc_reset: req.body,
      });
      console.log(errors.array());
      return;
    } else {
      const new_expenses = new Miscellaneous({
        weekly_product_misc: req.body.weekly_product_misc,
        misc_name: req.body.misc_name,
        amount: req.body.amount,
      });
      console.log(new_expenses);
      new_expenses.save((err) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        res.redirect("/weekly_products");
      });
    }
  },
];

exports.sales_history_add_misc_get = function (req, res, next) {
  console.log(req.params.id);
  WeeklyProducts.findById(req.params.id)
    .sort({ createdAt: "desc" })
    .exec(function (err, results) {
      if (err) {
        return next(err);
      }

      res.render("expenses", {
        title: "Add Expenses",
        weekly_product_sales: results,
        errors: null,
      });
    });
};

exports.sales_history_add_misc_post = [
  body("weekly_product_misc").isLength({ min: 1 }).trim().escape(),
  [body("misc_name").toLowerCase().isLength({ min: 1 }).trim().escape()],
  body("amount").isLength({ min: 1 }).trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("expenses", {
        title: "Add Expenses",
        weekly_product_sales: results[0],
        errors: errors.array(),
      });
      console.log(errors.array());
      return;
    } else {
      const new_expenses = new Miscellaneous({
        weekly_product_misc: req.body.weekly_product_misc,
        misc_name: req.body.misc_name,
        amount: req.body.amount,
      });
      console.log(new_expenses);
      new_expenses.save((err) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        const weekly_products_url = new_expenses.weekly_product_misc;
        console.log(weekly_products_url);
        res.redirect(`/sales_history/${weekly_products_url}`);
      });
    }
  },
];

exports.misc_delete = function (req, res, next) {
  const id = req.params.id;
  Miscellaneous.findByIdAndRemove(id)
    .then(function (result) {
      console.log(result);
      res.json({ redirect: "" });
    })
    .catch((err) => {
      return next(err);
    });
};
