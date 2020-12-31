const {check} = require('express-validator');
const {regex} = require('../helper/function.helper');

module.exports = signupStudentValidate =()=> [
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
    check('ngay_sinh').custom((value, {req, loc, path}) => {
        const date = new Date();
        console.log(value < moment(date).format('YYYY-MM-DD'))
        if ( value > moment(date).format('YYYY-MM-DD')) {
            throw new Error('Ngày sinh không hợp lệ');
        } else {return value; }
    }),
    check('ngay_sinh', 'Ngày sinh không hợp lệ').matches(regex.ngay_sinh),
    check('password', 'password không được bỏ trống')
        .not()
        .isEmpty(),
    check('password', ' password phải từ 6-24 kí tự').isLength({min: 6, max: 24}),
    check('password', 'password không hợp lệ').matches(regex().mat_khau),
];
