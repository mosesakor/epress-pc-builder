var Product = require('../models/product');
var Component = require('../models/component')

exports.homepage = function(req, res, next) {
    Product.find({}, 'title component')
    .populate('component')
    .exec(function (err, list_products) {
        if (err) { return next(err); }
        res.render('homepage', { title: 'System Builder', product_list: list_products });
    });
};

// Display list of all products.
exports.product_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Product list');
};

// Display detail page for a specific product.
exports.product_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Product detail: ' + req.params.id);
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
exports.product_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Product update GET');
};

// Handle product update on POST.
exports.product_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Product update POST');
};