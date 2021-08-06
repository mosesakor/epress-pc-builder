require("dotenv").config();
var Product = require('../models/product');
var Component = require('../models/component')
var async = require('async');
var mongoose = require('mongoose')

const fs = require('fs');
const { body, validationResult } = require("express-validator");

exports.homepage = function(req, res, next) {
    Component.find()
    .exec(function (err, list_components) {
        if (err) { return next(err); }
        res.render('homepage', { title: 'System Builder', component_list: list_components });
    });
};

// Display list of all products.
exports.product_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Product list');
};

// Display detail page for a specific product.
exports.product_detail = function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      let err = new Error("Invalid ObjectID");
      err.status = 404;
      return next(err);
    }
    Product.findById(req.params.id)
      .populate("component")
      .exec(function (err, product) {
        if (err) next(err);
  
        if (product == null) {
          let err = new Error(
            "Product not found. It may have been deleted, or does not exist."
          );
          err.status = 404;
          return next(err);
        }
  
        res.render("product_detail", {
          title: product.name,
          product: product,
          component: product.component,
        });
      });
  };
  

// Display product create form on GET.
exports.product_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Product create GET');
};

// Handle product create on POST.
exports.product_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Product create POST');
};

// Display product delete form on GET.
exports.product_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Product delete GET');
};

// Handle product delete on POST.
exports.product_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Product delete POST');
};

// Display product update form on GET.
exports.product_update_get = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    let err = new Error("Invalid ObjectID");
    err.status = 404;
    return next(err);
  }
  async.parallel(
    {
      product: function (callback) {
        Product.findById(req.params.id)
          .populate("component")
          .exec(callback);
      },
      components: function (callback) {
        Component.find().exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);

      if (results.product == null) {
        let err = new Error(
          "Product not found. It may have been deleted, or does not exist."
        );
        err.status = 404;
        return next(err);
      }

      res.render("product_update_form", {
        title: "Update Product",
        product: results.product,
        components: results.components,
        isUpdating: true,
      });
    }
  );
};

// Handle product update on POST.
exports.product_update_post = [
  body("name", "Name must be at least 3 characters in length")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("technialInformation").trim().escape(),
  body("Stock", "Stock cannot be lower than 0").isInt({ min: 0, max: 9999 }),
  body("price", "Price must be between $0 and $999999").isFloat({
    min: 0,
    max: 999999,
  }),
  body("component", "Component must not be empty").trim().escape(),

  (req, res, next) => {
    if (req.body.password != process.env.ADMIN_PASSWORD) {
      if (req.file) {
        fs.unlink(`public/images/${req.file.img}`, (err) => {
          if (err) console.log(err);
          console.log(req.file.img, "was deleted");
        });
      }
      let err = new Error("The password you entered is incorrect.");
      err.status = 401;
      return next(err);
    } else {
      const errors = validationResult(req);
      const product = new Product({
        name: req.body.name,
        technialInformation: req.body.technicalInformation,
        stock: req.body.stock,
        price: req.body.price,
        component: req.body.component,
        _id: req.params.id,
      });

      if (req.file && errors.isEmpty()) {
        console.log('FILE', req.file)
        product.img = req.file.img;
        fs.unlink(`public/images/${req.body.img}`, (err) => {
          if (err) console.log(err);
          console.log(req.body.img, "was deleted");
        });
      } else if(req.body.img && req.body.img !='null' && req.body.img !='undefined'){
        component.img = req.body.img;
      }

      if (!errors.isEmpty()) {
        if(req.file){
          fs.unlink(`public/images/${req.file.img}`, (err) => {
            if (err) console.log(err);
            console.log(req.file.img, "was deleted");
          });
        }
        
        async.parallel(
          {
            components: function (callback) {
              Component.find().exec(callback);
            },
          },
          function (err, results) {
            if (err) return next(err);
            res.render("product_update", {
              title: "Update Product",
              product: product,
              components: results.components,
              isUpdating: true,
              errors: errors.array(),
            });
          }
        );
        return;
      } else {
        Product.findByIdAndUpdate(
          req.params.id,
          product,
          {},
          function (err, theproduct) {
            if (err) return next(err);
            if (theproduct) {
              res.redirect(theproduct.url);
            } else {
              let err = new Error(
                "Product not found. It may have been deleted, or does not exist."
              );
              err.status = 404;
              return next(err);
            }
          }
        );
      }
    }
  },
];