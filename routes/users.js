const auth = require('../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if user isn't already on the system
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already Registered');

    user = new User( _.pick(req.body, ['name', 'email', 'password']) );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = jwt.sign({_id: user._id}, config.get('jwtMyKey'));

    res.header('x-auth-token', token).send( _.pick(user, ['_id', 'name', 'email']) );
});

module.exports = router;

// /api/users