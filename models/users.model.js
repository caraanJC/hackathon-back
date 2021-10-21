const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    username: { type: String },
    password: { type: String },
    roles: [String],
    avatar: { type: String },
    cart: [{ itemID: { type: String }, count: { type: Number } }],
});

module.exports = mongoose.model('Users', UsersSchema);
