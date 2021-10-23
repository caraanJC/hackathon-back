const router = require('express').Router();
const auth = require('./verifyToken');

const bcrypt = require('bcrypt');

const users = require('../models/users.model');

router.get('/', auth, (req, res) => {
    users.findById(req.user._id).then((data) => {
        if (data.roles.includes('admin')) {
            users.find().then((data) => {
                res.send(
                    data.map((datum) => {
                        return {
                            _id: datum._id,
                            email: datum.email,
                            roles: datum.roles,
                            cart: datum.cart,
                            avatar: datum.avatar,
                        };
                    })
                );
            });
        } else {
            res.send('Insufficient Permissions');
        }
    });
});

router.get('/:id/getUser', auth, (req, res) => {
    users.findById(req.params.id).then((data) => {
        res.send({
            _id: data._id,
            email: data.email,
            roles: data.roles,
            cart: data.cart,
            avatar: data.avatar,
            address: data.address,
        });
    });
});

router.put('/changeAvatar', auth, (req, res) => {
    users
        .findByIdAndUpdate(req.user._id, {
            $set: { avatar: req.body.url },
        })
        .then((data) => res.send('Avatar Uploaded'));
});

router.put('/changeAddress', auth, (req, res) => {
    users
        .findByIdAndUpdate(req.user._id, {
            $set: { address: req.body.address },
        })
        .then((data) =>
            res.send({ success: true, message: 'Address Changed' })
        );
});

router.post('/checkPassword', auth, (req, res) => {
    users.findById(req.user._id).then(async (data) => {
        const match = await bcrypt.compare(req.body.password, data.password);
        if (match) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
});

router.put('/changePassword', auth, async (req, res) => {
    try {
        users.findById(req.user._id).then(async (data) => {
            const match = await bcrypt.compare(
                req.body.oldPassword,
                data.password
            );
            if (match) {
                const passwordHash = await bcrypt.hash(req.body.password, 10);

                users
                    .findByIdAndUpdate(req.user._id, {
                        $set: { password: passwordHash },
                    })
                    .then((data) => {
                        res.send({
                            success: true,
                            message: 'Changed User Password',
                        });
                    });
            } else {
                res.send({ success: false, message: 'Wrong Password' });
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// cart
router.put('/cart/addToCart', auth, (req, res) => {
    users.findById(req.user._id).then((data) => {
        const itemExistingInCart = data.cart.find(
            (item) => item.itemID === req.body.itemID
        );

        if (itemExistingInCart) {
            users
                .updateOne(
                    { _id: req.user._id, 'cart.itemID': req.body.itemID },
                    {
                        $inc: { 'cart.$.count': 1 },
                    }
                )
                .then((data) => res.send('Item Added To Cart'));
        } else {
            users
                .findByIdAndUpdate(req.user._id, {
                    $addToSet: { cart: { itemID: req.body.itemID, count: 1 } },
                })
                .then((data) => res.send('Increased Item Count in Cart'));
        }
    });
});

// increase cart item count
router.put('/cart/increaseCount', auth, (req, res) => {
    users
        .updateOne(
            { _id: req.user._id, 'cart.itemID': req.body.itemID },
            {
                $inc: { 'cart.$.count': 1 },
            }
        )
        .then((data) => res.send('Increased Item Count in Cart'));
});

router.put('/cart/decreaseCount', auth, (req, res) => {
    users
        .updateOne(
            { _id: req.user._id, 'cart.itemID': req.body.itemID },
            {
                $inc: { 'cart.$.count': -1 },
            }
        )
        .then((data) => res.send('Decreased Item Count in Cart'));
});

router.put('/cart/deleteItem', auth, (req, res) => {
    users
        .findByIdAndUpdate(req.user._id, {
            $pull: { cart: { itemID: req.body.itemID } },
        })
        .then((data) => res.send('Deleted Item in Cart'));
});

router.put('/cart/emptyCart', auth, (req, res) => {
    users
        .findByIdAndUpdate(req.user._id, {
            $set: { cart: [] },
        })
        .then((data) => res.send('Cart is now empty'));
});
module.exports = router;
