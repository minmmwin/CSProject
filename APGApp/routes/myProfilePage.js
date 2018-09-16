const express =  require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

// Load profileInfo Model
require('../models/ProfileInfo');
const ProfileInfo = mongoose.model('profileInfo');

// Load User Model ** added myself due to**
require('../models/User');
const User = mongoose.model('users');

// myProfile Index Page
/*router.get('/', ensureAuthenticated, (req, res)=> {
    ProfileInfo.find({})
        .then(profileInfos => {
                res.render('myProfilePage/myProfileIndex', {
                    profileInfos: profileInfos
                });
        });
});*/

// myProfileIndex Page
router.get('/myProfileIndex', ensureAuthenticated, (req, res)=> {
    ProfileInfo.find({user:req.user.id}).then(profile => {
                res.render('myProfilePage/myProfileIndex', {
                    profile: profile
                });
        });
});

// Profiles Index 9/12
router.get('/profileList', ensureAuthenticated, (req, res)=> {
    ProfileInfo.find({})
    .populate('user') 
    .then(profileInfos => {

                res.render('myProfilePage/profileList', {
                    profileInfos: profileInfos
                });
           // }
        });
    
});

// Show Single Profile
router.get('/show/:id', (req, res) => {
    ProfileInfo.findOne({
        _id: req.params.id
    })
    .then(profile => {
        res.render('myProfilePage/show', {
            profile: profile
        });
    });
});

// Add profileinformation form / editProfilePage Route
router.get('/addProfilePage', ensureAuthenticated, (req, res)=>{
    res.render('myProfilePage/addProfilePage');
});

// Edit profileinformation form / editProfilePage Route
router.get('/editProfilePage/:id', (req, res)=>{
    ProfileInfo.findOne({
        _id: req.params.id
    })
    .then(profile => {
        if(profile.user != req.user.id){
            req.flash('error_msg', 'Not Authorized');
            res.redirect('/myProfilePage');
        } else {
            res.render('myProfilePage/editProfilePage',{
                profile : profile
            });
        }
        
    });
});


// Process form inputs from addProfilePage
router.post('/', ensureAuthenticated, (req, res) => {
    console.log(req.body);
    //res.send('ok');
    let errors = [];

    if(!req.body.headline){
        errors.push({text:'Please add a headline'});
    }

    if(!req.body.name){
        errors.push({text:'Please add name'});
    }

    if(!req.body.age){
        errors.push({text:'Please add age'});
    }

    if(!req.body.location){
        errors.push({text:'Please add location'});
    }

    if(!req.body.addAboutMe){
        errors.push({text:'Please add About Me'});
    }

    if(!req.body.addHobbiesInterests){
        errors.push({text:'Please add Hobbies & Interests'});
    }

    if(!req.body.gender){
        errors.push({text:'Please add gender'});
    }

 /*   if(errors.length > 0) {
        res.render('myProfilePage/addProfilePage', {
            errors: errors,
            headline: req.body.headline,
            name: req.body.name,
            age: req.body.age,
            location: req.body.location,
            aboutMe: req.body.aboutMe,
            hobbiesInterests: req.body.hobbiesInterests,
            gender: req.body.gender
        });
    } else {*/
        //res.send('passed');
        const newUser = {
            image: req.body.image,
            headline: req.body.headline,
            name: req.body.name,
            age: req.body.age,
            location: req.body.location,
            aboutMe: req.body.aboutMe,
            hobbiesInterests: req.body.hobbiesInterests,
            gender: req.body.gender,
            user: req.user.id
        }
        new ProfileInfo(newUser).save().then(profile => {
            req.flash('success_msg', 'Profile info added');
            res.redirect(`/myProfilePage/show/${profile.id}`);
        });
});

// Edit Form process for myProfile
router.put('/:id', (req, res) => {
    //res.send('put');
    ProfileInfo.findOne({
        _id: req.params.id
    })
    .then(profile => {   
        //new values
        profile.image = req.body.image;
        profile.headline = req.body.headline;
        profile.name = req.body.name;
        profile.age = req.body.age;
        profile.location = req.body.location;
        profile.aboutMe = req.body.aboutMe;
        profile.hobbiesInterests = req.body.hobbiesInterests;
        profile.gender = req.body.gender;

        profile.save()
        .then(profile => {
                //res.redirect('/myProfilePage');
                res.redirect(`/myProfilePage/show/${profile.id}`);
            })

    });
});

// Delete Story
router.delete('/:id', (req, res) => {
    //res.send('delete');
    ProfileInfo.remove({_id: req.params.id})
    .then(() => {
        res.redirect('../settingPage');
    });
});

module.exports = router;