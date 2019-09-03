const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    }
});

module.exports = mongoose.model('Product', productSchema);
