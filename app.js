var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo");

//routers
var usersRouter = require("./routes/users");
var productRouter = require("./routes/product");

//auth
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var crypto = require("crypto");
var session = require("express-session");
var MongoStore = require("connect-mongo");
var User = require("./models/Users");

var app = express();

//database CONNECTION
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind("Mongo db conn error"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

//authentication middleware
passport.use(
  new LocalStrategy({ passReqToCallback: true }, function (
    req,
    username,
    password,
    done
  ) {
    User.findOne({ username: username })
      .then((user) => {
        if (!user) {
          return done(
            null,
            false,
            req.flash("message", "Invalid username or password!")
          );
        } //validates if user is exists or not

        // Function defined at bottom of app.js
        const isValid = validPassword(password, user.hash, user.salt);

        if (isValid) {
          return done(null, user);
        } else {
          return done(
            null,
            false,
            req.flash("message", "Invalid username or password!")
          );
        }
      })
      .catch((err) => {
        done(err);
      });
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI, //(URI FROM.env file)
});

app.use(
  session({
    //secret: process.env.SECRET,
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, //sec, mins, hrs, days
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/user/login", (req, res, next) => {
  res.render("login", { title: "Login", message: req.flash("message") });
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/user/login",
    successRedirect: "/",
  }),
  (err, req, res, next) => {
    if (err) return next(err);
  }
);

//register;
app.get("/user/register", (req, res, next) => {
  res.render("register", { title: "Register" });
});

app.post("/user/register", (req, res, next) => {
  const saltHash = generatePassword(req.body.validated_password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    hash: hash,
    salt: salt,
  });
  newUser.save().then((user) => {
    console.log(user);
  });
  res.redirect("/user/login");
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

function generatePassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

app.use("/", checkAuthentication, productRouter);

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.redirect("/user/login");
  }
}

app.use((req, res, next) => {
  res.status(404).render("404");
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
