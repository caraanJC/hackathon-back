const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SalesSchema = Schema({
    email: String,
    price: Number,
    date: { type: Date, default: Date.now },
    userID: String,
    address: String,
    noOfItems: Number,
});

module.exports = mongoose.model('Sales', SalesSchema);
