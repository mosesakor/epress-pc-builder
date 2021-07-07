var mongoose = require('mongoose');

var Schema = mongoose.Schema;   

var ProductSchema = new Schema(
    {
        name: {type: String, required: true},
        component: {type: Schema.Types.ObjectId, ref: 'Component', required: true},
        price: {type: String, required: true},
        stock: {type: String, required: true},
        manufacturer: {type: String, required: true},
        technicalInformation: [String],
        img: {type: String},
    }
)

// Virtual for product's url
ProductSchema
.virtual('url')
.get(function () {
  return '/catalog/product/' + this._id;
});

module.exports = mongoose.model('Product', ProductSchema);