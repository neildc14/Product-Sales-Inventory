var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const MiscellaneousSchema = new Schema({
  misc_name: String,
  amount: Number,
});

module.exports = mongoose.model("Miscellaneous", MiscellaneousSchema);
