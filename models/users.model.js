const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    email: { type: String },
    password: { type: String },
    roles: [String],
    avatar: { type: String },
    cart: [{ itemID: { type: String }, count: { type: Number } }],
    address: { type: String },
});

module.exports = mongoose.model('Users', UsersSchema);
