const mongoose = require('mongoose');
const passport = require('passport');
const AdminSchema = require('../model/adminSchema');
const {validationResult} = require('express-validator');
module.exports = {
    admin_login_post_result: function (req, res, next) {
        if (req.user) 
            res
                .status(200)
                .json({'success': true, 'msg': req.flash('success')});
        else 
            res
                .status(400)
                .json({
                    'success': false,
                    'errors': [
                        {
                            'msg': req.flash('error')[0]
                        }
                    ]
                });
        }
    ,
    admin_login_post: async function (req, res, next) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({'success': false, 'errors': errors.array()})
        }
        passport.authenticate('local', {
            successRedirect: '/admin/login',
            failureRedirect: '/admin/login',
            failureFlash: true,
            successFlash: 'Đăng nhập thành công !!'
        })(req, res);
    },
    admin_logout: function (req, res) {
        req.logout()
        res
            .status(200)
            .json({'msg': 'Đăng xuất thành công'})
    }
}