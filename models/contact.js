const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    subject: String,
    message: String
});

module.exports = mongoose.model('Contact', productSchema);
