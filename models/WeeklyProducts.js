var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var { DateTime } = require("luxon");

const WeeklyProductsSchema = new Schema(
  {
    weekly_product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    weekly_misc_expenses: [
      { type: Schema.Types.ObjectId, ref: "Miscellaneous" },
    ],
    date_start: { type: Date, default: Date.now },
    date_end: Date,
  },
  { timestamps: true }
);

WeeklyProductsSchema.virtual("url").get(function () {
  return "/weekly_products/" + this._id;
});

WeeklyProductsSchema.virtual("date_start_formatted").get(function () {
  return DateTime.fromJSDate(this.date_start).toLocaleString(DateTime.DATE_MED);
});

WeeklyProductsSchema.virtual("date_end_formatted").get(function () {
  return DateTime.fromJSDate(this.date_end).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("WeeklyProducts", WeeklyProductsSchema);
