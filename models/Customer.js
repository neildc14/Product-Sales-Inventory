var mongoose = require("mongoose");
var Schema = mongoose.Schema();

const CustomerSchema = new Schema({
  customer_name: { type: String, required: true, maxLength: 100 },
  address: String,
  quantity_ordered: Number,
  total_purchased: Number,
});

CustomerSchema.virtual("url").get(() => {
  return "/customer" + this._id;
});

module.exports = mongoose.model("Customer", CustomerSchema);
