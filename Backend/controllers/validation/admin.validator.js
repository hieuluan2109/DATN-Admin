const loginValidate = require('./login.validator');
const signupTeacherValidate = require('./signup-teacher.validator');
const signupStudentValidate = require('./signup-student.validator');
const changePasswordValidate = require('./change-password.validator');
const createChoiceQuestionValidate = require('./create-choice-question.validator');
const createAssayQuestionValidate = require('./create-assay-question.validator');
const createCatagoryValidate = require('./create-catagory.validator');
const updateAdminProfileValidate = require('./update-admin-profile.validator');

let validateLogin = () => loginValidate()
let validateSignUpTecher = () => signupTeacherValidate();
let validateSignUpStudent = () => signupStudentValidate();
let validateChangePassword = (req, res, next) => changePasswordValidate(req, res, next);
let validateCreateChoiceQuestion = () => createChoiceQuestionValidate();
let validateCreateAssayQuestion = () => createAssayQuestionValidate();
let validateCreateCategory = () => createCatagoryValidate();
let validateUpdateAdminProfile = () => updateAdminProfileValidate();
let validate = {
    validateCreateCategory,
    validateLogin,
    validateSignUpTecher,
    validateChangePassword,
    validateSignUpStudent,
    validateCreateChoiceQuestion,
    validateCreateAssayQuestion,
    validateUpdateAdminProfile,
};
module.exports = {
    validate 
};