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
    validate.validateChangePassword(),
    AdminController.admin_change_password
);


router.get(
    '/profile',
    passport.authenticate('jwt', {session: false}),
    AdminController.get_profile_admin
);
module.exports = router;