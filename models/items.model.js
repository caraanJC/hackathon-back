const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemsSchema = Schema({
    name: String,
    price: String,
    description: String,
    stock: Number,
});

module.exports = mongoose.model('Items', ItemsSchema);
