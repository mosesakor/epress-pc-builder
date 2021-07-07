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
  componentdetail = {name: name}
  
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

function productCreate(name, component, price, stock, manufacturer, technicalInformation, img, cb) {
  productdetail = { 
    name: name,
    component: component,
    price: price,
    stock: stock,
    manufacturer: manufacturer,
    technicalInformation: technicalInformation,
    img: img,
  }
    
  var product = new Product(productdetail);    
  product.save(function (err) {
    if (err) {              






      asasddddsfaaqsqqqswsqawer
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
        },
        ],
        // optional callback
        cb);
}


function createProducts(cb) {
    async.parallel([
        function(callback) {
          productCreate('AMD Ryzen Threadripper 3990X, 64 Cores & 128-Threads Unlocked Desktop Processor', components[0], '$4,989.99', '20', 'AMD', ['cores: 64', 'Base Speed: 2.9 GHz', 'Turbo Speed: 4.3 GHz', 'Model: Ryzen Threadripper 3990X', 'Socket Type: sTRX4', 'Memory Type: DDR4 - 3200 MHz', 'Threads: 128'], '01', callback);
        },
        function(callback) {
          productCreate('Intel Core i9-10980XE, 18 Cores & 16 Threads Turbo Unlocked X-Series Desktop Processor', components[0], '$1,087', '20', 'Intel', ['cores: 18', 'Base Speed: 3.0 GHz', 'Turbo Speed: 4.8 GHz', 'Model: Core i9-10980XE', 'Socket Type: LGA 2066', 'Memory Type: DDR4 - 2933 MHz', 'Threads: 36',], '02', callback);
        },
        function(callback) {
          productCreate('AMD Ryzen Threadripper 3960X 24-Core, 48-Thread Unlocked Desktop Processor', components[0], '$1,399', 'AMD', '20', ['cores: 24', 'Base Speed: 3.8 GHz', 'Turbo Speed: 4.5GHz', 'Model: Ryzen Threadripper 3960X', 'Socket Type: sTRX4', 'Memory Type: DDR4 - 3200 MHz', 'Threads: 48'], '03', callback);
        },
        function(callback) {
          productCreate('ASRock MB TRX40 Creator AMD Ryzen Threadripper sTRX4 TRX40 Max256GB DR4 ATX', components[1], '$599.95', 'ASRock', '20', ['Chipset: AMD X570', 'Form Factor: ATX', 'Model: TRX40 CREATOR', 'Socket Type: sTRX4', 'Memory Slots: 8 Slots', 'Max Memory Support: 256 GB'], '04', callback);
        },
        function(callback) {
          productCreate('GIGABYTE TRX40 AORUS PRO WiFi (sTRX/AMD/TRX40/Fins-Array Heatsink/12+2 Phases Infineon Digital VRM/3x PCIe 4.0x4 M.2/Intel WiFi 6/Intel GbE LAN/ATX/Motherboard)', components[1], '$490.81', 'Gigabyte', '20', ['Chipset: AMD TRX40', 'Form Factor: ATX', 'Model: TRX40 Aorus Pro WiFi', 'Socket Type: sTRX4', 'Memory Slots: 8 Slots', 'Max Memory Support: 256 GB'], '05', callback);
        },
        function(callback) {
          productCreate('ASUS ROG Zenith II Extreme Alpha TRX40 Gaming AMD 3rd Gen Ryzen Threadripper sTRX4 EATX Motherboard with 16 Infineon Power Stages, PCIe 4.0, Wi-Fi 6 (802.11ax), USB 3.2 Gen 2x2 and Aura Sync RGB)', components[1], '$870.99', 'ASUS', '20', ['Chipset: AMD TRX40', 'Form Factor: Extended ATX', 'Model: ROG ZENITH II EXTREME ALPHA', 'Socket Type: sTRX4', 'Memory Slots: 8 Slots', 'Max Memory Support: 256 GB'], '06', callback);
        },
        function(callback) {
          productCreate('ASUS ROG STRIX GeForce RTX 2080TI-O11G Overclocked 11G GDDR6 HDMI DP 1.4 USB Type-C Gaming Graphics Card', components[2], '$3,299.99', 'ASUS', '20', ['Memory: 11 GB', 'Memory Interface: GDDR6', 'Length: 304.7 mm', 'Interface: PCIe x16', 'Chipset: GeForce RTX 2080 Ti', 'Base Clock: 1350 MHz', 'Clock Speed: 1665 MHz'], '07', callback)
        },
        function(callback) {
          productCreate('NVIDIA GEFORCE RTX 2080 Ti Founders Edition', components[2], '$3,391.73', 'NVIDIA', '20', ['Memory: 11 GB', 'Memory Interface: GDDR6', 'Length: 267 mm', 'Interface: PCIe x16', 'Chipset: GeForce RTX 2080 Ti', 'Base Clock: 1350 MHz', 'Clock Speed: 1635 MHz'], '08', callback)
        },
        function(callback) {
          productCreate('MSI GAMING GeForce RTX 2080 Ti GDRR6 352-bit HDMI/DP/USB Ray Tracing Turing Architecture Graphics Card', components[2], '$3,789', 'MSI', '20', ['Memory: 11 GB', 'Memory Interface: GDDR6', 'Length: 267 mm', 'Interface: PCIe x16', 'Chipset: GeForce RTX 2080 Ti', 'Base Clock: 1350 MHz', 'Clock Speed: 1755 MHz'], '09', callback)
        },
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
        },
        function(callback) {
          productInstanceCreate(products[2], 'In-Stock', callback)
        },
        function(callback) {
          productInstanceCreate(products[3], 'In-Stock', callback)
        },
        function(callback) {
          productInstanceCreate(products[4], 'In-Stock', callback)
        },
        function(callback) {
          productInstanceCreate(products[5], 'In-Stock', callback)
        },
        function(callback) {
          productInstanceCreate(products[6], 'In-Stock', callback)
        },
        function(callback) {
          productInstanceCreate(products[7], 'In-Stock', callback)
        },
        function(callback) {
          productInstanceCreate(products[8], 'In-Stock', callback)
        },
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




