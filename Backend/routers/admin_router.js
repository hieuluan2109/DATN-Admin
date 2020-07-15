const express = require('express');
const router = express.Router();
const passport = require('passport');
const AdminController = require('../controllers/admin_controller');
const {validate} = require('../controllers/admin_validator');

router.post(
    '/login',
    validate.validateLogin(),
    AdminController.admin_login_post
);
router.get(
    '/logout',
    passport.authenticate('jwt', {session: false}),
    AdminController.admin_logout
);
router.post(
    '/qlnguoidung/them/gv',
    passport.authenticate('jwt', {session: false}),
    validate.validateSignUpTecher(),
    AdminController.admin_add_teacher
);
router.post(
    '/qlnguoidung/them/sv',
    passport.authenticate('jwt', {session: false}),
    validate.validateSignUpStudent(),
    AdminController.admin_add_student
);
router.post(
    '/changepassword',
    passport.authenticate('jwt', {session: false}),
    validate.validateChangePassword(),
    AdminController.admin_change_password
);
router.get(
    '/profile',
    passport.authenticate('jwt', {session: false}),
    AdminController.get_profile_admin
);
router.get(
    '/user/list/teacher',
    passport.authenticate('jwt', {session: false}),
    AdminController.admin_get_teacher_list
);
router.get(
    '/user/list/student',
    passport.authenticate('jwt', {session: false}),
    AdminController.admin_get_student_list
);
router.get(
    '/category/list',
    passport.authenticate('jwt', {session: false}),
    AdminController.admin_get_category_list
);
router.get(
    '/question/list',
    passport.authenticate('jwt', {session: false}),
    AdminController.admin_get_question_list
);
router.get(
    '/user/detail/:user&:id',
    passport.authenticate('jwt', {session: false}),
    (req, res, next) => {
        const {user, id} = req.params;
        user == 'teacher'
            ? AdminController.admin_get_detail_teacher(res, next, id)
            : AdminController.admin_get_detail_student(res, next, id)
    },
);
module.exports = router;