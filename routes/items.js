const router = require('express').Router();
const auth = require('./verifyToken');

const items = require('../models/items.model');
const users = require('../models/users.model');

router.get('/', (req, res) => {
    items.find().then((data) => {
        res.send(data);
    });
});

router.post('/addItem', auth, (req, res) => {
    users.findById(req.user._id).then((data) => {
        if (data.roles.includes('admin')) {
            const newItem = new items(req.body);
            newItem.save().then((data) => res.send('Item added'));
        } else {
            res.send('Access denied');
        }
    });
});

router.put('/:item_id/editItem', auth, (req, res) => {
    users.findById(req.user._id).then((data) => {
        if (data.roles.includes('admin')) {
            items
                .findByIdAndUpdate(req.params.item_id, req.body)
                .then((data) => res.send('Item Edited'));
        } else {
            res.send('Access denied');
        }
    });
});

router.delete('/:item_id/deleteItem', auth, (req, res) => {
    users.findById(req.user._id).then((data) => {
        if (data.roles.includes('admin')) {
            items
                .findByIdAndDelete(req.params.item_id)
                .then((data) => res.send('Item Deleted'));
        } else {
            res.send('Access denied');
        }
    });
});

router.put('/:item_id/decreaseStock', auth, (req, res) => {
    items
        .findByIdAndUpdate(req.params.item_id, {
            $inc: { stock: -req.body.count },
        })
        .then((data) => res.send('Decreased stock'));
});

module.exports = router;
