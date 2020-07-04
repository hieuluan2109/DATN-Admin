const mongoose = require('mongoose');
const passport = require('passport');
const AdminSchema = require('../model/adminSchema');
const {validationResult} = require('express-validator');
module.exports = {
    // admin_login_post_result: function (req, res, next) {     const flashSuccess =
    // req.flash('success');     if (req.user)         res             .status(200)
    // .json({'success': true, 'msg': flashSuccess});     else         res
    // .status(401)             .json({                 'success': false,
    // 'errors': [                     {                         'msg':
    // req.flash('error')                     }                 ]             });
    // } ,
    admin_login_post: async function (req, res, next) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({'success': false, 'errors': errors.array()})
        }
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            // Redirect if it fails
            if (!user) {
                return res
                    .status(400)
                    .json({'success': false, 'errors': 'Email hoặc mật khẩu không đúng'});
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                // Redirect if it succeeds
                return res
                    .status(200)
                    .json({'success': true, 'msg': 'Login successful'});
            });
        })(req, res, next);
    },
    admin_logout: function (req, res) {
        if (req.user) {
            req.logout()
            res
                .status(200)
                .json({'success': true, 'msg': 'Đăng xuất thành công'});
        } else 
            res
                .status(400)
                .json({'success': false, 'msg': 'Bạn chưa đang nhập'});
        }
    ,
    get_profile_admin: function (req, res, next) {
        AdminSchema
            .find()
            .then(profile => res.status(200).json({'success': true, 'profile': profile}))
            .catch(err => res.status(400).json({'success': false, 'errors': err}))
        }
}