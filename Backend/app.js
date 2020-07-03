const express = require('express');
const app = express();
require('dotenv').config();
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const port = process.env.PORT || 8000;
const flash = require('connect-flash');
require('./config/passport')(passport);

app.set('views', './views');
app.set('view engine', 'ejs');
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

mongoose.connect(process.env.MONGODB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Kết nối thành công !!');
});

app.use('/admin', require('./routers/admin_router'));

app.listen( port , (error) => {
    error
        ? console.log('Error : ' + error)
        : console.log("Your app running on port " + port)
});