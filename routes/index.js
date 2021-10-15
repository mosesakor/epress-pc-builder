var express = require('express');
var router = express.Router();

var async = require("async");

var Component = require("../models/component");
var Product = require("../models/product");

var mongoose = require("mongoose");
var path = require("path");
var multer = require("multer");

// Require controller modules.
var product_controller = require('../controllers/productController');
var component_controller = require('../controllers/componentController');
var product_instance_controller = require('../controllers/productInstanceController');




/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/list');
});



// Require controller modules.
var component_controller = require("../controllers/componentController");
var product_controller = require("../controllers/productController");

function getStoredProducts(req, next) {
  let promises = [];
  for (const componentID in req.cookies) {
    if (
      mongoose.Types.ObjectId.isValid(componentID) &&
      mongoose.Types.ObjectId.isValid(req.cookies[componentID])
    ) {
      promises.push(
        new Promise(function (resolve, reject) {
          Product.findById(req.cookies[componentID]).exec(function (
            err,
            product
          ) {
            if (err) return next(err);
            resolve([componentID, product]);
          });
        })
      );
    }
  }
  return promises;
}

router.get("/list", function (req, res, next) {
  async.parallel(
    {
      components: function (callback) {
        Component.find(callback);
      },
    },
    async function (err, results) {
      if (err) return next(err);
      const userList = {};
      await Promise.all(getStoredProducts(req, next)).then(function (products) {
        products.forEach((product) => {
          userList[product[0]] = product[1];
        });
      });
      res.render("list", {
        title: "System Builder",
        userList: userList,
        components: results.components,
      });
    }
  );
});


module.exports = router;
