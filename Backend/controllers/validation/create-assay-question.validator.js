const {check} = require('express-validator');

module.exports = createAssayQuestionValidate =()=> [
    check('noi_dung')
        .not()
        .isEmpty()
        .withMessage('Nội dung không được để trống')
        .isLength({min: 5})
        .withMessage('Nội dung câu hỏi quá ngắn'),
    check('danh_muc')
        .not()
        .isEmpty()
        .withMessage('Danh mục không được để trống'),
];
