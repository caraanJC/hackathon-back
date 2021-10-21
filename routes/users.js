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
        res.send({
            _id: data._id,
            username: data.username,
            roles: data.roles,
            avatar: data.avatar,
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
        const passwordHash = await bcrypt.hash(req.body.password, 10);

        users
            .findByIdAndUpdate(req.user._id, {
                $set: { password: passwordHash },
            })
            .then((data) => {
                res.send('Changed User Password');
            });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
