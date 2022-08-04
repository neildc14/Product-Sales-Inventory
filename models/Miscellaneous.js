var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const MiscellaneousSchema = new Schema(
  {
    weekly_product_misc: {
      type: Schema.Types.ObjectId,
      ref: "WeeklyProducts",
    },
    misc_name: String,
    amount: Number,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Miscellaneous", MiscellaneousSchema);
