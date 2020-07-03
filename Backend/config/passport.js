const passport = require('passport');
const localStategy = require('passport-local').Strategy;
const Admin = require('../model/adminSchema');
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
                if (user.mat_khau == password) 
                    return done(null, user)
                else 
                    return done(null, false, {message: 'Mật khẩu không đúng'})
            })
    }))
    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser((user, done) => {
        Admin
            .findOne({email: user.email})
            .then(email => done(null, user))
    })
}