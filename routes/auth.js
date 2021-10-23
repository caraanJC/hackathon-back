const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require('../models/users.model');

router.post('/register', (req, res) => {
    users.findOne({ email: req.body.email }).then(async (data) => {
        if (!data) {
            // make a new user
            const password = await bcrypt.hash(req.body.password, 10);
            const newUser = new users({
                email: req.body.email,
                password: password,
                roles: ['user'],
                avatar: '',
            });
            newUser.save().then((data) =>
                res.send({
                    success: true,
                    message: 'User Registration Successful',
                })
            );
        } else {
            res.send({ success: false, message: 'Try another username' });
        }
    });
});

router.post('/login', (req, res) => {
    users.findOne({ email: req.body.email }).then(async (data) => {
        if (data) {
            const match = await bcrypt.compare(
                req.body.password,
                data.password
            );
            if (match) {
                const token = jwt.sign(
                    { _id: data._id },
                    process.env.TOKEN_SECRET
                );
                res.header('auth-token', token).send({
                    success: true,
                    token,
                    user: {
                        _id: data._id,
                        email: data.email,
                        roles: data.roles,
                        avatar: data.avatar,
                        cart: data.cart,
                        address: data.address,
                    },
                });
            } else res.send({ success: false, message: 'Wrong credentials' });
        } else {
            res.send({ success: false, message: 'Username does not exist' });
        }
    });
});

module.exports = router;
