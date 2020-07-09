const {check, validateResult} = require('express-validator');
const regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
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
        check('ho', 'Họ không được để trống')
            .not()
            .isEmpty(),
        check('email', 'email không hợp lệ').isEmail(),
        check('email', 'email không được bỏ trống')
            .not()
            .isEmpty(),
        check('ngay_sinh', 'Ngày sinh không được bỏ trống')
            .not()
            .isEmpty(),
        check('ngay_sinh', 'Ngày sinh không hợp lệ').matches(regex),
        check('password', 'password không được bỏ trống')
            .not()
            .isEmpty(),
        check('password', 'password phải từ 6-24 kí tự').isLength({min: 6, max: 24})
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
        check('password1', 'password mới phải từ 6-24 kí tự').isLength({min: 6, max: 24}),   
        check('password2', 'Nhập lại mật khẩu mới không đúng').equals('password1')
    ];
};

let validate = {
    validateLogin: validateLogin,
    validateSignUpTecher: validateSignUpTecher,
    validateChangePassword: validateChangePassword
};
module.exports = {
    validate
};