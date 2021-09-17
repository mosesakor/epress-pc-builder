var Component = require('../models/component');
var Product = require('../models/product')
var mongoose = require('mongoose')
var async = require('async')

// Display list of all Components.// Display list of all Components.
exports.component_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Component list');
};

// Display detail page for a specific Component.

exports.component_detail = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    let err = new Error("Invalid ObjectID");
    err.status = 404;
    return next(err);
  }
  async.parallel(
    {
    component: function (callback) {
        Component.findById(req.params.id).exec(callback);
      },
    products: function (callback) {
    Product.find({ component: req.params.id })
        .populate("component")
          .exec(callback);
      },
    },
    function (err, results) {
        if (err) return next(err);
        if (results.component == null) {
            var err = new Error("Component not found");
            err.status = 404;
            return next(err);
        }
        res.render("component_detail", {
        title: "Choose " + results.component.title,
        component: results.component,
        products: results.products,
        });
    }
  );
};

// Display Component create form on GET.
exports.component_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Component create GET');
};

// Handle Component create on POST.
exports.component_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Component create POST');
};

// Display Component delete form on GET.
exports.component_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Component delete GET');
};

// Handle Component delete on POST.
exports.component_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Component delete POST');
};

// Display Component update form on GET.
exports.component_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Component update GET');
};

// Handle Component update on POST.
exports.component_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Component update POST');
};
