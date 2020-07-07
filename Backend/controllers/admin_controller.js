const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const NguoidungSchema = require('../model/nguoidung_schema');
const {validationResult} = require('express-validator');
module.exports = {
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
                const payload = {_id: user._id, email: user.email, loai: true, ho: user.ho, ten: user.ten}
                const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET) 
                return res
                    .status(200)
                    .json({'success': true, 'msg': 'Login successful', 'token': token});
            });
        })(req, res, next);
    },
    admin_logout: function (req, res) {
        // if (req.user) {
            req.logout()
            res
                .status(200)
                .json({'success': true, 'msg': 'Đăng xuất thành công'});
        // } else 
        //     res
        //         .status(400)
        //         .json({'success': false, 'msg': 'Bạn chưa đang nhập'});
        // }
    },
    get_profile_admin: function (req, res, next) {
        NguoidungSchema
            .find({loai: true})
            .then(profile => res.status(200).json({'success': true, 'profile': profile}))
            .catch(err => res.status(400).json({'success': false, 'errors': err}))
        }
}