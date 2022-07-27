var mongoose = require("mongoose");
var Schema = mongoose.Schema();
var { DateTime } = require("luxon");

const ProductSchema = new Schema({
  product_name: String,
  quantity: Number,
  original_price: Number,
  selling_price: Number,
  date: { type: Date, default: Date.now },
});

ProductSchema.virtual("url").get(() => {
  return "/product" + this._id;
});

ProductSchema.virtual("date_formatted").get(() => {
  return DateTime.fromJSDate(this.date).toLocalString(DateTime.DATE_MED);
});
module.exports = mongoose.model("Product", ProductSchema);
