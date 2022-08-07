var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var { DateTime } = require("luxon");

const ProductSchema = new Schema(
  {
    weekly_product: {
      type: Schema.Types.ObjectId,
      ref: "WeeklyProducts",
    },
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    product_name: String,
    quantity: Number,
    original_price: Number,
    selling_price: Number,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

ProductSchema.virtual("url").get(function () {
  return "/weekly_products/" + this._id;
});

ProductSchema.virtual("date_formatted").get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

ProductSchema.virtual("original_price_formatted").get(function () {
  return `₱${this.original_price}.00`;
});

ProductSchema.virtual("selling_price_formatted").get(function () {
  return `₱${this.selling_price}.00`;
});

module.exports = mongoose.model("Product", ProductSchema);
