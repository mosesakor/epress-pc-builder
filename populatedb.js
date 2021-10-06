#! /usr/bin/env node

console.log('This script populates some test components, products and productinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Product = require('./models/product')
var Component = require('./models/component')
var ProductInstance = require('./models/productinstance')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var components = []
var products = []
var productinstances = []

function componentCreate(name, cb) {
  componentdetail = {name: name};
  
  var component = new Component(componentdetail);
       
  component.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Component: ' + component);
    components.push(component)
    cb(null, component)
  }  );
}

function productCreate(name, component, price, stock, technicalInformation, img, cb) {
  productdetail = { 
    name: name,
    component: component,
    price: price,
    stock: stock,
    technicalInformation: technicalInformation,
    img: img,
  }
    
  var product = new Product(productdetail);    
  product.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Product: ' + product);
    products.push(product)
    cb(null, product)
  }  );
}


function productInstanceCreate(product, status, cb) {
  productinstancedetail = { 
    product: product,
    status: status
  }    
    
  var productinstance = new ProductInstance(productinstancedetail);    
  productinstance.save(function (err) {
    if (err) {
      console.log('ERROR CREATING ProductInstance: ' + productinstance);
      cb(err, null)
      return
    }
    console.log('New ProductInstance: ' + productinstance);
    productinstances.push(productinstance)
    cb(null, productinstance)
  }  );
}



function createComponents(cb) {
    async.series([
        function(callback) {
          componentCreate('Processor', callback);
        },
        function(callback) {
          componentCreate('Motherboard', callback);
        },
        function(callback) {
          componentCreate('Gaphics Card', callback);
        },
        function(callback) {
          componentCreate('Monitor', callback);
        },
        function(callback) {
          componentCreate('Storage', callback);
        },
        function(callback) {
          componentCreate('Case', callback);
        },
        function(callback) {
          componentCreate('RAM', callback);
        },
        function(callback) {
          componentCreate('CPU Cooler', callback);
        },
        function(callback) {
          componentCreate('Power Supply', callback);
        }
        ],
        // optional callback
        cb);
}


function createProducts(cb) {
    async.parallel([
        function(callback) {
          productCreate('AMD Ryzen Threadripper 3990X, 64 Cores &  128-Threads Unlocked Desktop Processor', components[0], '$4,989.99', 20, 'Brand: AMD, Model: Ryzen Threadripper 3990X, cores: 64, Threads: 128, Socket Type: sTRX4, Base Speed: 2.9 GHz, Turbo Speed: 4.3 GHz, Memory Type: DDR4 - 3200 MHz', '01', callback);
        },
        function(callback) {
          productCreate('Intel Core i9-10980XE, 18 Cores & 16 Threads Turbo Unlocked X-Series Desktop Processor', components[0], '$1,087.99', 20, 'Brand: Intel, Model: Core i9-10980XE, Cores: 18,  Threads: 36, Socket Type: LGA 2066, Base Speed: 3.0 GHz, Turbo Speed: 4.8 GHz, Memory Type: DDR4 - 2933 MHz', '02', callback);
        }
        
        ],
        // optional callback
        cb);
}


function createProductInstances(cb) {
    async.parallel([
        function(callback) {
          productInstanceCreate(products[0], 'In-Stock', callback)
        },
        function(callback) {
          productInstanceCreate(products[1], 'In-Stock', callback)
        }
        
        ],
        // Optional callback
        cb);
}



async.series([
    createComponents,
    createProducts,
    createProductInstances
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('PRODUCTInstances: '+productinstances);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




