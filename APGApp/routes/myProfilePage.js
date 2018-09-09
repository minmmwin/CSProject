const express =  require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load profileInfo Model
require('../models/ProfileInfo');
const ProfileInfo = mongoose.model('profileInfo');

// myProfile Index Page
router.get('/', (req, res)=> {
    ProfileInfo.find({})
        .then(profileInfos => {
            res.render('myProfilePage/myProfileIndex', {
                profileInfos: profileInfos
            });
        });
    
});

// Add profileinformation form / editProfilePage Route
router.get('/', (req, res)=>{
    res.render('myProfilePage/addProfilePage');
});

// Edit profileinformation form / editProfilePage Route
router.get('/editProfilePage/:id', (req, res)=>{
    ProfileInfo.findOne({
        _id: req.params.id
    })
    .then(profile => {
        res.render('myProfilePage/editProfilePage',{
            profile : profile
        });
    });
});


// Process form inputs from addProfilePage
router.post('/', (req, res) => {
    //console.log(req.body);
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
            headline: req.body.headline,
            name: req.body.name,
            age: req.body.age,
            location: req.body.location,
            aboutMe: req.body.aboutMe,
            hobbiesInterests: req.body.hobbiesInterests,
            gender: req.body.gender
        }
        new ProfileInfo(newUser).save().then(profile => {
            req.flash('success_msg', 'Profile info added');
            res.redirect('/myProfilePage');
        })
   // }

});

// Edit Form process for myProfile
router.put('/:id', (req, res) => {
    ProfileInfo.findOne({
        _id: req.params.id
    })
    .then(profile => {
        
        //new values
        profile.headline = req.body.headline;
        profile.name = req.body.name;
        profile.age = req.body.age;
        profile.location = req.body.location;
        profile.aboutMe = req.body.aboutMe;
        profile.hobbiesInterests = req.body.hobbiesInterests;
        profile.gender = req.body.gender;

        profile.save()
            .then(profile => {
                req.flash('success_msg', 'Profile info updated.');
                res.redirect('/myProfilePage');
            })

    });
});

module.exports = router;