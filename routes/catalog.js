var express = require('express');
var router = express.Router();

// Require controller modules.
var product_controller = require('../controllers/productController');
var component_controller = require('../controllers/componentController');
var product_instance_controller = require('../controllers/productInstanceController');

/// PRODUCT ROUTES ///

// GET catalog home page.
router.get('/', product_controller.homepage);

// GET request for creating a Product. NOTE This must come before routes that display Product (uses id).
router.get('/product/create', product_controller.product_create_get);

// POST request for creating Product.
router.post('/product/create', product_controller.product_create_post);

// GET request to delete Product.
router.get('/product/:id/delete', product_controller.product_delete_get);

// POST request to delete Product.
router.post('/product/:id/delete', product_controller.product_delete_post);

// GET request to update Product.
router.get('/product/:id/update', product_controller.product_update_get);

// POST request to update Product.
router.post('/product/:id/update', product_controller.product_update_post);

// GET request for one Product.
router.get('/product/:id', product_controller.product_detail);

// GET request for list of all Product items.
router.get('/products', product_controller.product_list);

/// COMPONENT ROUTES ///

// GET request for creating Component. NOTE This must come before route for id (i.e. display component).
router.get('/component/create', component_controller.component_create_get);

// POST request for creating Component.
router.post('/component/create', component_controller.component_create_post);

// GET request to delete Component.
router.get('/component/:id/delete', component_controller.component_delete_get);

// POST request to delete Component.
router.post('/component/:id/delete', component_controller.component_delete_post);

// GET request to update Component.
router.get('/component/:id/update', component_controller.component_update_get);

// POST request to update Component.
router.post('/component/:id/update', component_controller.component_update_post);

// GET request for one Component.
router.get('/component/:id', component_controller.component_detail);

// GET request for list of all Components.
router.get('/components', component_controller.component_list);


/// PRODUCTINSTANCE ROUTES ///

// GET request for creating a ProductInstance. NOTE This must come before route that displays ProductInstance (uses id).
router.get('/productinstance/create', product_instance_controller.productinstance_create_get);

// POST request for creating ProductInstance.
router.post('/productinstance/create', product_instance_controller.productinstance_create_post);

// GET request to delete ProductInstance.
router.get('/productinstance/:id/delete', product_instance_controller.productinstance_delete_get);

// POST request to delete ProductInstance.
router.post('/productinstance/:id/delete', product_instance_controller.productinstance_delete_post);

// GET request to update ProductInstance.
router.get('/productinstance/:id/update', product_instance_controller.productinstance_update_get);

// POST request to update ProductInstance.
router.post('/productinstance/:id/update', product_instance_controller.productinstance_update_post);

// GET request for one ProductInstance.
router.get('/productinstance/:id', product_instance_controller.productinstance_detail);

// GET request for list of all ProductInstance.
router.get('/productinstances', product_instance_controller.productinstance_list);

module.exports = router;
