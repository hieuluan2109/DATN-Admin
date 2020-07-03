const express = require('express');
const router = express.Router();
const AdminLoginController = require('../controllers/admin_controller');
// router.get('/', function (req, res){
//     res.send("Hello world");
// })

router.get('/login', AdminLoginController.admin_login_post_result);
router.post('/login', AdminLoginController.admin_login_post);

module.exports = router;