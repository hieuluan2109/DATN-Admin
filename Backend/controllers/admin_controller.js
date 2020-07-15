const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {sign_token, capitalizeFirstLetter, hashPassWord, checkPassword} = require(
    './admin_function'
);
const {NguoidungSchema, SinhvienSchema, DanhMucSchema, CauHoiSchema} = require(
    '../model/Schema'
);
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
        const check = await NguoidungSchema
            .findOne({email: data.email})
            .count((count) => count)
            .catch(err => 0);
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
                'nguoi_tao_id': req.user._id
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
        const check = await SinhvienSchema
            .find({
                $or: [
                    {
                        email: data.email
                    }, {
                        ma_sv: data.ma_sv
                    }
                ]
            })
            .count((count) => count)
            .catch(err => 0);
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
                'nguoi_tao_id': req.user._id
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
        const [id, password, password1, option] = [
            req.user._id,
            req.body.password,
            req.body.password1, {
                new: true,
                useFindAndModify: false
            }
        ];
        const check = await NguoidungSchema
            .findOne(id)
            .then(user => checkPassword(password, user.mat_khau))
            .catch(err => false); // Focus on here
        if (!check) {
            return res
                .status(400)
                .json({'success': false, 'errors': 'Mật khẩu cũ không đúng'})
        } else {
            const update = {
                mat_khau: await hashPassWord(password1)
            };
            NguoidungSchema.findByIdAndUpdate(id, {
                $set: update
            }, option, function (err, updated) { // need some attention
                if (err) 
                    return res
                        .status(400)
                        .json({'success': false, 'errors': 'Lỗi không xác định'})
                return res
                    .status(200)
                    .json({'success': true, 'msg': 'Chỉnh sửa mật khẩu thành công'})
            })
        }
    },

    get_profile_admin: async function (req, res) {
        await NguoidungSchema
            .findOne({_id: req.user._id})
            .exec((err, user) => {
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
    admin_get_teacher_list: async function (req, res) {
        //should add telephone number and more info about user
        await NguoidungSchema
            .find({
                loai: false
            }, ['ho', 'ten', '_id', 'email'])
            .exec((err, result) => {
                if (err) 
                    res
                        .status(400)
                        .json({'success': false, 'errors': err})
                res
                    .status(200)
                    .json({'success': true, 'data': result})
            })
    },
    admin_get_student_list: async function (req, res) {
        await SinhvienSchema
            .find({}, ['ho', 'ten', '_id', 'email'])
            .exec((err, result) => {
                if (err) 
                    res
                        .status(400)
                        .json({'success': false, 'errors': err})
                res
                    .status(200)
                    .json({'success': true, 'data': result})
            })
    },
    admin_get_category_list: async (req, res) => {
        await DanhMucSchema
            .find({})
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .exec((err, result) => {
                if (err) 
                    res
                        .status(400)
                        .json({'success': false, 'errors': err})
                res
                    .status(200)
                    .json({'success': true, 'data': result})
            })
    },
    admin_get_question_list: async function (req, res) {
        await CauHoiSchema
            .find({})
            .populate('danh_muc_id', ['_id', 'tieu_de'])
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .exec((err, result) => {
                if (err) 
                    res
                        .status(400)
                        .json({'success': false, 'errors': err})
                res
                    .status(200)
                    .json({'success': true, 'data': result})
            })
    },
    admin_get_detail_teacher: async function (res, next, id) {
        await NguoidungSchema
            .findOne({
                '_id': id,
                'loai': false
            }, [
                'ho',
                'ten',
                '_id',
                'email',
                'anh_dai_dien',
                'nguoi_tao_id',
                'createdAt',
                'updatedAt'
            ])
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .exec((err, result) => {
                if (err) 
                    next(err);
                if (!result || result.length < 1) 
                    return res
                        .status(400)
                        .json({'success': false, 'erros': 'Lỗi không tìm thấy!'})
                return res
                    .status(200)
                    .json({'success': true, 'data': result})
            })
    },
    admin_get_detail_student: async function (res, next, id) {
        await SinhvienSchema
            .findOne({
                '_id': id
            }, [
                'ma_sv',
                'ds_lop_hoc',
                'ho',
                'ten',
                '_id',
                'email',
                'anh_dai_dien',
                'nguoi_tao_id',
                'createdAt',
                'updatedAt'
            ])
            .populate('nguoi_tao_id', ['_id', 'ho', 'ten'])
            .exec((err, result) => {
                if (err) 
                    next(err);
                if (!result || result.length < 1) 
                    return res
                        .status(400)
                        .json({'success': false, 'erros': 'Lỗi không tìm thấy!'})
                return res
                    .status(200)
                    .json({'success': true, 'data': result})
            })
    }
};