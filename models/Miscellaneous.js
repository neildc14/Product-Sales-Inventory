var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const MiscellaneousSchema = new Schema({
  weekly_product: {
    type: Schema.Types.ObjectId,
    ref: "WeeklyProducts",
  },
  misc_name: String,
  amount: Number,
});

module.exports = mongoose.model("Miscellaneous", MiscellaneousSchema);
