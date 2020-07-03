const express = require('express');
const app = express();
require('dotenv').config();

const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
let jwtoptions = {};
const jwt = require('jsonwebtoken');
jwtoptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtoptions.secretOrKey = process.env.SESSION_SECRET;

const mongoose = require('mongoose');
const session = require('express-session');
const port = process.env.PORT || 8000;
const flash = require('connect-flash');
require('./config/passport')(passport);

// app.set('views', './views');
// app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use( session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxage: 1000 * 60 * 60 * 24 * 3
    },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use( passport.initialize() );
app.use( passport.session() );

require('./config/connectDB')(mongoose,process.env.MONGODB_CONNECTION);

app.use( require('./config/setHeader') );
app.use('/admin', require('./routers/admin_router'));

app.listen( port , (error) => {
    error
        ? console.log('Error : ' + error)
        : console.log("Your app running on port " + port)
});