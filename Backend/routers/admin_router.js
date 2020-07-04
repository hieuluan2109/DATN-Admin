const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin_controller');
const {validate} = require('../controllers/admin_validator');
// router.get('/', function (req, res){
//     res.send("Hello world");
// })

router.get('/login/result', AdminController.admin_login_post_result);
router.post('/login', validate.validateLogin() ,AdminController.admin_login_post);

router.get('/logout', AdminController.admin_logout);
router.get('/profile', AdminController.get_profile_admin);

module.exports = router;