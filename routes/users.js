var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

/* GET users listing. */
router.get("/login", userController.login_get);

router.post("/login", userController.login_post);

router.get("/register", userController.register_get);
router.post("/register", userController.register_post);

module.exports = router;
