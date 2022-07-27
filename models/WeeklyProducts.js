var mongoose = require("mongoose");
var Schema = mongoose.Schema();

const WeeklyProductSchema = new Schema({
  weekly_product: { type: Schema.Types.ObjectId, ref: "Product" },
  weekly_misc_expenses: { type: Schema.Types.ObjectId, ref: "Miscellaneous" },
  date_start: { type: Date, default: Date.now },
  date_end: { type: Date, default: Date.now },
});

WeeklyProductSchema.virtual("url").get(() => {
  return "/weekly_products" + this._id;
});

ProductSchema.virtual("date_start_formatted").get(() => {
  return DateTime.fromJSDate(this.date_start).toLocalString(DateTime.DATE_MED);
});

ProductSchema.virtual("date_end_formatted").get(() => {
  return DateTime.fromJSDate(this.date_end).toLocalString(DateTime.DATE_MED);
});

module.exports = mongoose.model("WeeklyProducts", WeeklyProductSchema);
