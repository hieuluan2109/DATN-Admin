const express = require('express');
const router = express.Router();
const AdminLoginController = require('../controllers/admin_controller');
const {validate} = require('../controllers/admin_validator');
// router.get('/', function (req, res){
//     res.send("Hello world");
// })

router.get('/login', AdminLoginController.admin_login_post_result);
router.post('/login', validate.validateLogin() ,AdminLoginController.admin_login_post);

router.get('/logout', AdminLoginController.admin_logout);

module.exports = router;