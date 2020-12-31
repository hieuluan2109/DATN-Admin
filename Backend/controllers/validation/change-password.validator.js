const {check} = require('express-validator');

module.exports = changePasswordValidate =(req, res, next)=> [
    check('password', 'password cũ không được bỏ trống')
        .not()
        .isEmpty(),
    check('password1', 'password mới không được bỏ trống')
        .not()
        .isEmpty(),
    check('password1', 'password mới phải từ 6-24 kí tự').isLength(
        {min: 6, max: 24}
    ),
    check('password1').custom((value, {req, loc, path}) => {
        if (value == req.body.password) {
            throw new Error('Mật khẩu mới không được giống mật khẩu cũ');
        } else {
            return value;
        }
    }),
    check('password2').custom((value, {req, loc, path}) => {
        if (value !== req.body.password1) {
            throw new Error('Nhập lại mật khẩu mới không chính xác');
        } else {
            return value;
        }
    })
];
