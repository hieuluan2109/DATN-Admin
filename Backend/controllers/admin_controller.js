const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {sign_token, capitalizeFirstLetter, hashPassWord} = require(
    './admin_function'
);
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
                const token = sign_token(user);
                return res
                    .status(200)
                    .json({'success': true, 'msg': 'Login successful', 'token': token});
            });
        })(req, res, next);
    },
    admin_logout: function (req, res) {
        req.logout()
        res
            .status(200)
            .json({'success': true, 'msg': 'Đăng xuất thành công'});
    },
    admin_them_nguoidung: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({'success': false, 'errors': errors.array()})
        }
        if ( NguoidungSchema.findOne({email: req.body.email}) ) 
            return res
                .status(400)
                .json({'success': false, 'errors': 'Email đã tồn tại'})
        switch (req.query.loai) {
            case 'gv':
                {
                    const gv = new NguoidungSchema({
                        'ho': capitalizeFirstLetter(req.body.ho),
                        'ten': capitalizeFirstLetter(req.body.ten),
                        'email': req.body.email,
                        'ngay_sinh': req.body.ngay_sinh,
                        'mat_khau': await hashPassWord(req.body.password),
                        'nguoi_tao': req.user._id
                    })
                    gv.save(function (err, doc) {
                        if (err) 
                            return console.log(err)
                        console.log(doc);
                    })
                };
                break;
            case 'sv':
                break;
        }
    },
    admin_change_password: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({'success': false, 'errors': errors.array()})
        }
        const data = req.body
        return console.log(data)
    },
    get_profile_admin: function (req, res, next) {
        NguoidungSchema
            .find({loai: true})
            .then(profile => res.status(200).json({'success': true, 'profile': profile}))
            .catch(err => res.status(400).json({'success': false, 'errors': err}))
        }
}