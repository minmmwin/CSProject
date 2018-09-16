const express =  require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

// Load User Model
require('../models/User');
const User = mongoose.model('users');

// User messageList Route
router.get('/messageList', (req, res) => {
    res.render('messageList/messageList');
});


module.exports = router;