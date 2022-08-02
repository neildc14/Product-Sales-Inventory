var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var { DateTime } = require("luxon");

const ProductSchema = new Schema(
  {
    weekly_product: {
      type: Schema.Types.ObjectId,
      ref: "WeeklyProducts",
    },
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

module.exports = mongoose.model("Product", ProductSchema);
