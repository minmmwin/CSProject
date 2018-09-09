const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt =  require('bcryptjs');

// Load user model
const User = mongoose.model('users');

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email'}, (email, password, done) => {
        console.log(email);
        User.findOne({
            email: email
        }).then(user => {
            if(!user){
                //$(".errors").text("Hello world!");
                return done(null, false, {message: 'No User Found'});
            }
        })
    }));
}