const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileInfoSchema = new Schema({
    image: {
        type: String
    },
    headline:{
        type: String,
        required: true     
    },
    name:{
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    aboutMe:{
        type: String,
        required: true
    },
    hobbiesInterests:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    browseUser:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }

});

mongoose.model('profileInfo', ProfileInfoSchema);