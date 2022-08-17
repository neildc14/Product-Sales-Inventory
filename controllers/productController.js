var { validationResult, body } = require("express-validator");
var Product = require("../models/Product");
var Customer = require("../models/Customer");
var Miscellaneous = require("../models/Miscellaneous");
var async = require("async");

exports.index_get = function (req, res, next) {
  async
    .parallel({
      customers: function (callback) {
        Customer.find().exec(callback);
      },
      products: function (callback) {
        Product.find().exec(callback);
      },
      miscellaneous: function (callback) {
        Miscellaneous.find().exec(callback);
      },
    })
    .then((asyncresults) => {
      const productCapitalArray = [];
      const salesArray = [];
      const expensesArray = [];
      asyncresults.customers.forEach((customer) => {
        asyncresults.products.forEach((product) => {
          if (String(customer.product_ordered) === String(product._id)) {
            let productCapital =
              customer.quantity_ordered * product.original_price;
            productCapitalArray.push(productCapital);
            salesArray.push(customer.total_purchased);
          }
        });
      });

      asyncresults.miscellaneous.forEach((miscellanous) => {
        expensesArray.push(miscellanous.amount);
      });

      let TotalExpenses = 0;
      expensesArray.forEach((expenses) => {
        TotalExpenses += expenses;
      });

      let TotalProductCapital = 0;
      productCapitalArray.forEach((productCapital) => {
        TotalProductCapital += productCapital;
      });

      let TotalSales = 0;
      salesArray.forEach((sales) => {
        TotalSales += sales;
      });

      let = TotalCapital = TotalProductCapital + TotalExpenses;
      let TotalRevenue = TotalSales - TotalCapital;

      res.render("index", {
        title: " Sales Inventory",
        TotalSales: TotalSales,
        TotalCapital: TotalCapital,
        TotalRevenue: TotalRevenue,
      });
    })
    .catch((err) => {
      return next(err);
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
        product_reset: req.body,
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
          customer_reset: undefined,
        });
      });
  });
};

exports.sales_history_add_product_post = [
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
        product: req.body,
        customer_reset: req.body,
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
        const weekly_products_url = new_product.weekly_product;
        res.redirect(`/sales_history/${weekly_products_url}`);
      });
    }
  },
];

exports.product_with_customers_delete = function (req, res, next) {
  const id = req.params.id;
  Product.findById(id).exec(function (err, product) {
    if (err) {
      return next(err);
    }
    Customer.find({ product_ordered: product._id })
      .sort({ customer_name: "asc" })
      .exec(function (err, customers) {
        if (err) {
          return next(err);
        }
        customers.forEach((customer) => {
          Customer.findByIdAndRemove(customer.id)
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              return next(err);
            });
        });

        Product.findByIdAndRemove(id)
          .then((result) => {
            console.log(result);
            res.json({ redirect: "" });
          })
          .catch((err) => {
            return next(err);
          });
      });
  });
};
