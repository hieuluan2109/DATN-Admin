const {check} = require('express-validator');

module.exports = loginValidate =()=> [
        check('email', 'email không được bỏ trống')
                .not()
                .isEmpty(),
        check('email', 'email không hợp lệ').isEmail(),
        check('password', 'password không được bỏ trống')
            .not()
            .isEmpty(),
        check('password', 'password phải từ 6-24 kí tự').isLength({min: 6, max: 24})
    ];
