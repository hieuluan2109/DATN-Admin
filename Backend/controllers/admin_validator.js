const { check, validateResult } = require('express-validator');

let validateLogin = () => {
    return [
        check('email', 'email không được bỏ trống ').not().isEmpty(),
        check('email', 'email không đúng định dạng').isEmail(),
        check('password', 'password không được bỏ trống').not().isEmpty(),
        check('password', 'password phải từ 6 kí tự').isLength( { min:6 } ),
    ];
}

let validate = {
    validateLogin: validateLogin
}
module.exports = {validate}