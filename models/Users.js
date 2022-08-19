const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  hash: String,
  salt: String,
});

module.exports = mongoose.model("Users", UserSchema);
