const router = require('express').Router();
const auth = require('./verifyToken');

const users = require('../models/users.model');

router.get('/', auth, (req, res) => {
    users.findById(req.user._id).then((data) => {
        if (data.roles.includes('admin')) {
            users.find().then((data) => {
                res.send(
                    data.map((datum) => {
                        return {
                            _id: datum._id,
                            username: datum.username,
                            roles: datum.roles,
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
        res.send({ _id: data._id, username: data.username, roles: data.roles });
    });
});

module.exports = router;
