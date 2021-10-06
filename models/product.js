var mongoose = require('mongoose');

var Schema = mongoose.Schema;   

var ProductSchema = new Schema(
    {
        name: {type: String, required: true},
        component: {type: Schema.Types.ObjectId, ref: 'Component', required: true},
        price: { type: String, required: true},
        stock: { type: Number, required: true, max: 9999, min: 0 },
        technicalInformation: {type: String, required: true},
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