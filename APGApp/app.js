const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');


const app = express();

// Load routes
const myProfilePage = require('./routes/myProfilePage');
const users = require('./routes/users');
const profileList = require('./routes/profileList');
const messageList = require('./routes/messageList');

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/database');

// Map global promise - get ride of warning
mongoose.Promise =  global.Promise;
// Connect to mongoose
mongoose.connect(db.mongoURI, {
    //useMongoClient: true
})
.then(()=> console.log('MongoDB (apg-dev) connected...'))
.catch(err => console.log(err));


//const users = require('./routes/users');

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Static folder (this creats public folder to be static folder)
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
app.use(methodOverride('_method'));

// Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global variables
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// index Route
app.get('/', (req, res)=>{
    const title = 'Welcome';
    res.render('index', {
        title: title
    });
});


// APG Route
app.get('/apg', (req, res)=>{
    //res.render('apg');
    res.render('signInOrSignUpPage');
});


// settingPage Route
app.get('/settingPage', (req, res)=>{
    res.render('settingPage');
});

var messages = [
    {name: "Joh", message: "Hello"},
    {name: "Jane", message: "Hi"},
]
// Message Route
app.get('/message', (req, res)=>{
    res.render('message');
    //res.render(messages);
});

// Message Route
app.get('/message/messages', (req, res)=>{
    res.send(messages);
    //res.render(messages);
});

// Use routes
app.use('/myProfilePage', myProfilePage);
app.use('/users', users);
app.use('/profileList', profileList);
app.use('/messageList', messageList);

const port = process.env.PORT || 5200;

app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
});