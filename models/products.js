const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
<<<<<<< HEAD
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number
=======
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
>>>>>>> master
});

module.exports = mongoose.model('Product', productSchema);
