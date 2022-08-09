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
      if (results === null) {
        var err = new Error("Weekly Sales Product not found");
        err.status = 404;
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
          const Customers = [];
          const TotalCapitalArray = [];
          const TotalSalesArray = [];
          const MiscellaneousExpensesArray = [];

          asyncresults.product.forEach((product) => {
            const quantityArray = [];

            asyncresults.customer.forEach((customer) => {
              if (String(product._id) === String(customer.product_ordered)) {
                Customers.push(customer);
                quantityArray.push(customer.quantity_ordered);
              }
            });

            let TotalQuantityEachProducts = 0;
            quantityArray.forEach((quantity) => {
              let OverallQuantity = TotalQuantityEachProducts + quantity;
              let quantityMultipliedToOriginalPrice =
                OverallQuantity * Number(product.original_price);
              let quantityMultipliedToSellingPrice =
                OverallQuantity * Number(product.selling_price);

              TotalCapitalArray.push(quantityMultipliedToOriginalPrice);
              TotalSalesArray.push(quantityMultipliedToSellingPrice);
            });
          });

          asyncresults.miscellaneous.forEach((miscellaneous) => {
            MiscellaneousExpensesArray.push(miscellaneous.amount);
          });

          let TotalMiscellaneousExpenses = 0;
          MiscellaneousExpensesArray.forEach((miscellaneous_expenses) => {
            TotalMiscellaneousExpenses += Number(miscellaneous_expenses);
          });

          let TotalProductsCapital = 0;
          TotalCapitalArray.forEach((capital) => {
            TotalProductsCapital += capital;
          });

          let WeeklyTotalSales = 0;
          TotalSalesArray.forEach((sales) => {
            WeeklyTotalSales += sales;
          });

          let WeeklyProductsCapital =
            TotalProductsCapital + TotalMiscellaneousExpenses;

          let WeeklyTotalIncome = WeeklyTotalSales - WeeklyProductsCapital;

          res.render("weekly_product_sales", {
            title: "Weekly Sales",
            weekly_product_sales: results[0],
            products: asyncresults.product,
            miscellaneous: asyncresults.miscellaneous,
            customers: Customers,
            weekly_total_capital: WeeklyProductsCapital,
            weekly_total_sales: WeeklyTotalSales,
            weekly_total_income: WeeklyTotalIncome,
            errors: null,
          });
        })
        .catch((err) => {
          return next(err);
        });
    });
};

exports.sales_history = function (req, res, next) {
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

      res.render("sales_history", {
        title: "Sales History",
        all_weekly_product_sales: results,
      });
    });
};

exports.weekly_products_details = function (req, res, next) {
  WeeklyProducts.findById(req.params.id)
    .sort({ createdAt: "desc" })
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      if (result === null) {
        var err = new Error("Weekly Sales Product not found");
        err.status = 404;
        return next(err);
      }
      async
        .parallel({
          product: function (callback) {
            Product.find({ weekly_product: result._id })
              .sort({ product_name: "asc" })
              .exec(callback);
          },
          miscellaneous: function (callback) {
            Miscellaneous.find({ weekly_product_misc: result._id })
              .sort({ product_name: "asc" })
              .exec(callback);
          },
          customer: function (callback) {
            Customer.find({ weekly_product: result._id })
              .sort({ createdAt: "asc" })
              .exec(callback);
          },
        })
        .then(function (asyncresults) {
          const Customers = [];
          const TotalCapitalArray = [];
          const TotalSalesArray = [];
          const MiscellaneousExpensesArray = [];

          asyncresults.product.forEach((product) => {
            const quantityArray = [];

            asyncresults.customer.forEach((customer) => {
              if (String(product._id) === String(customer.product_ordered)) {
                Customers.push(customer);
                quantityArray.push(customer.quantity_ordered);
              }
            });

            let TotalQuantityEachProducts = 0;
            quantityArray.forEach((quantity) => {
              let OverallQuantity = TotalQuantityEachProducts + quantity;
              let quantityMultipliedToOriginalPrice =
                OverallQuantity * Number(product.original_price);
              let quantityMultipliedToSellingPrice =
                OverallQuantity * Number(product.selling_price);

              TotalCapitalArray.push(quantityMultipliedToOriginalPrice);
              TotalSalesArray.push(quantityMultipliedToSellingPrice);
            });
          });

          asyncresults.miscellaneous.forEach((miscellaneous) => {
            MiscellaneousExpensesArray.push(miscellaneous.amount);
          });

          let TotalMiscellaneousExpenses = 0;
          MiscellaneousExpensesArray.forEach((miscellaneous_expenses) => {
            TotalMiscellaneousExpenses += Number(miscellaneous_expenses);
          });

          let TotalProductsCapital = 0;
          TotalCapitalArray.forEach((capital) => {
            TotalProductsCapital += capital;
          });

          let WeeklyTotalSales = 0;
          TotalSalesArray.forEach((sales) => {
            WeeklyTotalSales += sales;
          });

          let WeeklyProductsCapital =
            TotalProductsCapital + TotalMiscellaneousExpenses;

          let WeeklyTotalIncome = WeeklyTotalSales - WeeklyProductsCapital;
          if (WeeklyTotalIncome < 0) {
            WeeklyTotalIncome = 0;
          }

          console.log(asyncresults.product);
          res.render("sales_history_weekly_products", {
            title: "Weekly Sales History Detail",
            weekly_product_sales: result,
            products: asyncresults.product,
            miscellaneous: asyncresults.miscellaneous,
            customers: Customers,
            weekly_total_capital: WeeklyProductsCapital,
            weekly_total_sales: WeeklyTotalSales,
            weekly_total_income: WeeklyTotalIncome,
            errors: null,
          });
        })
        .catch((err) => {
          return next(err);
        });
    });
};
