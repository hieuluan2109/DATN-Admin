const {check} = require('express-validator');

module.exports = createCatagoryValidate =()=> [
    check('tieu_de')
        .not()
        .isEmpty()
        .withMessage('Tiêu đề không được để trống'),
    check('mo_ta')
        .not()
        .isEmpty()
        .withMessage('Mô tả không được để trống')
];
