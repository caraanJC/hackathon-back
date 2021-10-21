const router = require('express').Router();
const auth = require('./verifyToken');

const sales = require('../models/sales.model');
const users = require('../models/users.model');

router.get('/', auth, (req, res) => {
    users.findById(req.user._id).then((data) => {
        if (data.roles.includes('admin')) {
            sales.find().then((data) => res.send(data));
        } else {
            res.send('Access denied');
        }
    });
});

router.post('/addSale', auth, (req, res) => {
    const newSale = new sales(req.body);
    newSale.save().then((data) => res.send('New Sale Added'));
});

router.put('/:sale_id/editSale', auth, (req, res) => {
    sales
        .findByIdAndUpdate(req.params.sale_id, req.body)
        .then((data) => res.send('Sale Updated'));
});

router.delete('/:sale_id/deleteSale', auth, (req, res) => {
    sales.findByIdAndDelete(req.params.sale_id).then('Sale Deleted');
});

module.exports = router;
