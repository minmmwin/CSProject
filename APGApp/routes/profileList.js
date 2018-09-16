const express =  require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

// Load profileInfo Model
require('../models/ProfileInfo');
const ProfileInfo = mongoose.model('profileInfo');

// Load User Model ** added myself due to stories**
require('../models/User');
const User = mongoose.model('users');

// profileList Route
router.get('/profileList', (req, res) => {
    ProfileInfo.find({})
    .populate('user')     //POPULATE user with all the fields from user collection
    .then(profileInfos => {
        res.render('profileList/profileList', {
            profileInfos: profileInfos
        });
    });
});

// Show Single Profile
router.get('/show/:id', (req, res) => {
    ProfileInfo.find({
        _id: req.params.id
    })
    .then(profileInfos => {
        res.render('profileList/show', {
            profileInfos: profileInfos
        });
    });
});



module.exports = router;