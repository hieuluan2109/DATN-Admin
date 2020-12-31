const {check} = require('express-validator');
const {regex} = require('../helper/function.helper');

module.exports = updateAdminProfileValidate =(req, res, next)=> [
    check('ten', 'Tên không được bỏ trống')
        .not()
        .isEmpty(),
    check('ten', 'Tên không hợp lệ').matches(regex.ho_ten),
    check('ho', 'Họ không được để trống')
        .not()
        .isEmpty(),
    check('ho', 'Họ không hợp lệ').matches(regex.ho_ten),
    check('ngay_sinh').custom((value, {req, loc, path}) => {
        const date = new Date();
        console.log(value < moment(date).format('YYYY-MM-DD'))
        if ( value > moment(date).format('YYYY-MM-DD')) {
            throw new Error('Ngày sinh không hợp lệ');
        } else {return value; }
    }),
    check('ngay_sinh', 'Ngày sinh không hợp lệ').matches(regex.ngay_sinh),
];
