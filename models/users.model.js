const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    username: { type: String },
    password: { type: String },
    roles: [String],
    avatar: { type: String },
});

module.exports = mongoose.model('Users', UsersSchema);
