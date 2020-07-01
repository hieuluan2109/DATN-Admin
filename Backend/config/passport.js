const passport = require('passport');
const localStategy = require('passport-local').Strategy;
const Admin = require('../model/adminSchema');
require('dotenv').config()
module.exports = function (passport) {
    passport.use(new localStategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async function (email, password, done) {
        await Admin
            .findOne({email: email})
            .then(user => {
                if (!user) 
                    return done(null, false, {message: 'Email không đúng'})
                if (user.password == password) 
                    return done(null, user)
                else 
                    return done(null, false, {message: 'Mật khẩu không đúng'})
            })
    }))
    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser((name, done) => {
        Admin
            .findOne({email: name.email})
            .then(email => done(null, name))
    })
}