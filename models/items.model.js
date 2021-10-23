const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemsSchema = Schema({
    name: String,
    price: String,
    description: String,
    stock: Number,
    image: String,
});

module.exports = mongoose.model('Items', ItemsSchema);
