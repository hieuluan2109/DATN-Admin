const {check, validateResult} = require('express-validator');
const {regex, removeAscent} = require('./admin_function');
let validateLogin = () => {
    return [
        check('email', 'email không được bỏ trống')
            .not()
            .isEmpty(),
        check('email', 'email không hợp lệ').isEmail(),
        check('password', 'password không được bỏ trống')
            .not()
            .isEmpty(),
        check('password', 'password phải từ 6-24 kí tự').isLength({min: 6, max: 24})
    ];
};
let validateSignUpTecher = () => {
    
    return [
        check('ten', 'Tên không được bỏ trống')
            .not()
            .isEmpty(),
        check('ten', 'Tên không hợp lệ').matches(regex.ho_ten),
        check('ho', 'Họ không được để trống')
            .not()
            .isEmpty(),
        check('ho', 'Họ không hợp lệ').matches(regex.ho_ten),
        check('email', 'email không hợp lệ').isEmail(),
        check('email', 'email không được bỏ trống')
            .not()
            .isEmpty(),
        check('ngay_sinh', 'Ngày sinh không được bỏ trống')
            .not()
            .isEmpty(),
        check('ngay_sinh', 'Ngày sinh không hợp lệ').matches(regex().ngay_sinh),
        check('password', 'password không được bỏ trống')
            .not()
            .isEmpty(),
        check('password', 'password phải từ 6-24 kí tự').isLength({min: 6, max: 24})
    ];
};
let validateSignUpStudent = () => {
    return [
        check('ma_sv', 'Mã sinh viên không được để trống')
            .not()
            .isEmpty(),
        check('ma_sv', 'Mã sinh viên không hợp lệ').matches(regex().massv),
        check('ten', 'Tên không được bỏ trống')
            .not()
            .isEmpty(),
        check('ten', 'Tên không hợp lệ').matches(regex.ho_ten),
        check('ho', 'Họ không được để trống')
            .not()
            .isEmpty(),
            check('ho', 'Họ không hợp lệ').matches(regex.ho_ten),
        check('email', 'email không hợp lệ').isEmail(),
        check('email', 'email không được bỏ trống')
            .not()
            .isEmpty(),
        check('ngay_sinh', 'Ngày sinh không được bỏ trống')
            .not()
            .isEmpty(),
        check('ngay_sinh', 'Ngày sinh không hợp lệ').matches(regex.ngay_sinh),
        check('password', 'password không được bỏ trống')
            .not()
            .isEmpty(),
        check('password', ' password phải từ 6-24 kí tự').isLength({min: 6, max: 24})
    ];
};
let validateChangePassword = () => {
    return [
        check('password', 'password củ không được bỏ trống')
            .not()
            .isEmpty(),
        check('password1', 'password mới không được bỏ trống')
            .not()
            .isEmpty(),
        check('password1', 'password mới phải từ 6-24 kí tự').isLength(
            {min: 6, max: 24}
        ),
        check('password2', 'Nhập lại mật khẩu mới không đúng').equals('password1')
    ];
};

let validate = {
    validateLogin: validateLogin,
    validateSignUpTecher: validateSignUpTecher,
    validateChangePassword: validateChangePassword,
    validateSignUpStudent: validateSignUpStudent,
};
module.exports = {
    validate
};