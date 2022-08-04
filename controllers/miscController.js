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
      console.log(results[0]);
      res.render("expenses", {
        title: "Add Expenses",
        weekly_product_sales: results[0],
        errors: null,
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
