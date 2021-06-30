var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ComponentSchema = new Schema(
    {
        name: {type: String, required: true, maxLength: 100},
    }
)

// Virtual for component's URL
ComponentSchema
.virtual('url')
.get(function () {
  return '/catalog/component/' + this._id;
});

module.exports = mongoose.model('Component', ComponentSchema);