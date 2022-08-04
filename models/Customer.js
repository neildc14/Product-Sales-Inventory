var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    customer_name: { type: String, required: true, maxLength: 100 },
    address: String,
    product_ordered: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity_ordered: Number,
    total_purchased: Number,
  },
  { timestamps: true }
);

CustomerSchema.virtual("url").get(function () {
  return "/customer/" + this._id;
});

module.exports = mongoose.model("Customer", CustomerSchema);
