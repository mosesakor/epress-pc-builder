var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductInstanceSchema = new Schema(
    {
        product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
        status: {type: String, required: true, enum: ['In-Stock', 'Out-of-Stock'], default: 'In-Stock'}
    }
)


// Virtual for ProductInstance's URL
ProductInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/productinstance/' + this._id;
});

//Export model
module.exports = mongoose.model('productinstance', ProductInstanceSchema);