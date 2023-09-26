// Import required modules
const express = require('express');
const app = express();  // Create an instance of the Express app
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('./models/userModels')


const homeRoutes = require('./routes/homeRoutes')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const studentRoutes = require('./routes/studentRoutes')
const instructorRoutes = require('./routes/instructorRoutes')


// Set up the database connection
mongoose.connect('mongodb+srv://EOlaw146:Olawalee_.146@cluster0.4wv68hn.mongodb.net/University?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
// Check for database connection errors
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


// Set the view engine to EJS
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


// Set up middleware for parsing JSON and handling URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  //Use for parsing json data into mongoose
app.use(session({ secret: 'notagoodsecret' })) //use for user authentication
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/img', express.static(__dirname + 'public/img')) //to load images


//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(User.authenticate(User.authenticate())));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Set up session handling middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}))


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    //res.locals.success = req.flash('success');
    //res.locals.error = req.flash('error');
    next();
  })



app.use('/', homeRoutes)
app.use('/user', userRoutes)
app.use('/admin', adminRoutes);
app.use('/instructor', instructorRoutes)
app.use('/student', studentRoutes);


app.listen(4000, () => {
    console.log('listening on 4000')
})