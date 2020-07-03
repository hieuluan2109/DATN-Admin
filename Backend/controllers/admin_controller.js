const mongoose = require('mongoose');
const passport = require('passport');
const AdminSchema = require('../model/adminSchema');
module.exports = {
    admin_login_post_result: function(req, res, next) {
        if ( req.user )
            res.status(200).json({ 'message': req.flash('success') });
        else
            res.status(400).json({ 'message': req.flash('error') });
    },
    admin_login_post: 
        passport.authenticate('local',{
            successRedirect: '/admin/login',
            failureRedirect: '/admin/login',
            failureFlash: true,
            successFlash: 'Đăng nhập thành công !!',
        })
}