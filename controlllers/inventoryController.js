exports.inventory_index_get = function (req, res, next) {
  res.render("index", { title: " Sales Inventory" });
};

exports.product_list_get = function (req, res, next) {
  res.render("product_list", { title: "Product List" });
};

exports.add_product_get = function (req, res, next) {
  res.send("NOT IMPLEMENTD");
};
