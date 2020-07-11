const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {sign_token, capitalizeFirstLetter, hashPassWord} = require(
    './admin_function'
);
const NguoidungSchema = require('../model/nguoidung_schema');
const SinhvienSchema = require('../model/sinhvien_schema');
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
    admin_add_teacher: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({'success': false, 'errors': errors.array()})
        }
        const data = req.body;
        let check = await NguoidungSchema
            .findOne({email: data.email})
            .count((count) => count)
        if (check) 
            return res
                .status(400)
                .json({'success': false, 'errors': 'Email đã tồn tại'})
        else {
            const gv = new NguoidungSchema({
                'ho': capitalizeFirstLetter(data.ho),
                'ten': capitalizeFirstLetter(data.ten),
                'email': data.email,
                'ngay_sinh': new Date(data.ngay_sinh),
                'mat_khau': await hashPassWord(data.password),
                'nguoi_tao': req.user._id
            })
            gv.save(function (err, doc) {
                if (err) 
                    return res
                        .status(400)
                        .json({'success': false, 'errors': err})
                res
                    .status(200)
                    .json({'success': true, 'msg': 'Thêm giáo viên thành công'})
            })
        }
    },
    admin_add_student: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({'success': false, 'errors': errors.array()})
        }
        const data = req.body;
        let check = await SinhvienSchema
            .find({
                $or:[{ email: data.email }, { ma_sv: data.ma_sv }]
            })
            .count((count) => count)
        if (check) 
            return res
                .status(400)
                .json({'success': false, 'errors': 'Email hoặc mã số sinh viên đã tồn tại'})
        else {
            const sv = new SinhvienSchema({
                'ma_sv': data.ma_sv,
                'ho': capitalizeFirstLetter(data.ho),
                'ten': capitalizeFirstLetter(data.ten),
                'email': data.email,
                'ngay_sinh': new Date(data.ngay_sinh),
                'mat_khau': await hashPassWord(data.password),
                'nguoi_tao': req.user._id
            })
            sv.save(function (err, doc) {
                if (err) 
                    return res
                        .status(400)
                        .json({'success': false, 'errors': err})
                res
                    .status(200)
                    .json({'success': true, 'msg': 'Thêm sinh viên thành công'})
            })
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

    get_profile_admin: async function (req, res) {
        await NguoidungSchema
            .findOne({_id: req.user._id})
            .exec( (err, user) => {
                if (err) 
                    return res
                        .status(200)
                        .json({'success': false, 'errors': err})
                else {
                    let data = user.toObject();
                    delete data.mat_khau;
                    return res
                        .status(200)
                        .json({'success': true, 'data': data})
                }
            });
        },
};