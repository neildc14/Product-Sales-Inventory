var express = require("express");
var router = express.Router();
var inventoryController = require("../controlllers/inventoryController");

//home
router.get("/", inventoryController.inventory_index_get);

module.exports = router;
