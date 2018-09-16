const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileListSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    details:{
        type: String,
        required: true
    }
});

mongoose.model('profileList', ProfileListSchema);