const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SalesSchema = Schema({
    name: String,
    price: Number,
    count: Number,
    date: { type: Date, default: Date.now },
    userID: String,
});

module.exports = mongoose.model('Sales', SalesSchema);
