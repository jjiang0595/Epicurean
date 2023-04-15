const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const user = new User({ email: req.body.email, username: req.body.email });
        await user.setPassword(req.body.password);
        await user.save();

        res.status(201).json({ status: 'success' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json({ message: 'You have successfully logged in!' });
});

router.post('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ message: 'You have successfully logged out!' });
})

module.exports = router;