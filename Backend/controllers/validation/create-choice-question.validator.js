const {check} = require('express-validator');

module.exports = createChoiceQuestionValidate =()=> [
    check('noi_dung')
        .not()
        .isEmpty()
        .withMessage('Nội dung không được để trống')
        .isLength({min: 4})
        .withMessage('Nội dung câu hỏi quá ngắn'),
    check('lua_chon')
        .not()
        .isEmpty()
        .withMessage('Lựa chọn không được để trống'),
    check('danh_muc')
        .not()
        .isEmpty()
        .withMessage('Danh mục không được để trống'),
];
