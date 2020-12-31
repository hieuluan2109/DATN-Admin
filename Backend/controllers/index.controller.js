const LoginController = require('./login.controller');
const AdminController = require('./admin.controller');
const QuestionController = require('./cauhoi.controller');
const UserController = require('./nguoidung.controller');
const CategoryController = require('./danhmuc.controller');
const ClassController = require('./lop.controller');
const Stats = require('./stats.controller');
const Test = require('./baithi.controller');
const Exercise = require('./baitap.controller');
require('../model/index.schema');
require('./helper/function.helper');

module.exports = {
    LoginController,
    AdminController,
    QuestionController,
    UserController,
    CategoryController,
    ClassController,
    Stats,
    Test,
    Exercise
};