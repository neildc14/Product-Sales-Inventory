const passport = require("passport");
const crypto = require("crypto");
const User = require("../models/Users");

exports.login_get = function (req, res, next) {
  res.render("login", { title: "Login Account" });
};
exports.login_post = [
  passport.authenticate("local", {
    faliureRedirect: "/login",
    successRedirect: "/",
  }),
  (err, req, res, next) => {
    if (err) return next(err);
  },
];
exports.register_get = function (req, res, next) {
  res.render("register", { title: "Register Account" });
};
exports.register_post = function (req, res, next) {
  const saltHash = genPassword(req.body.validate_password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
  });
  newUser.save().then((user) => {
    console.log(user);
  });
  res.redirect("/user/login");
};

function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}
