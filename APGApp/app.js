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

// Passport Config
require('./config/passport')(passport);

// Map global promise - get ride of warning
mongoose.Promise =  global.Promise;
// Connect to mongoose
mongoose.connect('mongodb://localhost/apg-dev',{
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

app.use(flash());

//Global variables
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// index Route
app.get('/', (req, res)=>{
    const title = 'Welcome';
    res.render('index', {
        title: title
    });
});

// About Route
app.get('/about', (req, res)=>{
    res.render('about');
});

// APG Route
app.get('/apg', (req, res)=>{
    //res.render('apg');
    res.render('signInOrSignUpPage');
});

// signInPage Route
app.get('/signInPage', (req, res)=>{
    res.render('signInPage');
});

// signUpPage Route
app.get('/signUpPage', (req, res)=>{
    res.render('signUpPage');
});

// settingPage Route
app.get('/settingPage', (req, res)=>{
    res.render('settingPage');
});





// Use routes
app.use('/myProfilePage', myProfilePage);
app.use('/users', users);

const port = 5200;

app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
});