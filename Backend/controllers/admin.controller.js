const {validationResult} = require('express-validator');
const Admin = require('../model/Admin');
const EditInfomation = require('../model/EditInfomation');
module.exports = {
    admin_change_password: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({'success': false, 'errors': errors.array()})
        };
        const [_id,{password, password1 }, option ] = [ req.user ,req.body, { new: true, useFindAndModify: false }]
        const result = Admin.changePassword(_id,password, password1, option);
        return result.success ? res.status(200).json(result) : res.status(400).json(result);
    },
    admin_update_profile: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({'success': false, 'errors': errors.array()})
        };
        const [{ ho, ten, ngay_sinh, anh_dai_dien, gioi_tinh, sdt}, option] = [ req.body, { new: true, useFindAndModify: false }];
        const update = !anh_dai_dien 
                        ? { 'ho': ho, 'ten': ten, 'ngay_sinh': ngay_sinh, 'gioi_tinh': !(Boolean(gioi_tinh)), 'sdt': sdt }
                        : {'anh_dai_dien': anh_dai_dien};
        const result = Admin.updateProfile(req.user._id, update);
        return result.success ? res.status(200).json(result) : res.status(400).json(result);
    },
    admin_get_profile: async function (req, res) {
        const result = Admin.getProfile(req.user._id);
        result.success ? res.status(200).json(result) : res.status(400).json(result);
    },
    admin_forgot_password: async function(req, res, next) {
        const {email} = req.body;
        const result = Admin.forgotPassword(email);
        return result.success ? res.status(200).json(result) : res.status(400).json(result)
    },
    admin_change_password_with_code: async function (req, res) {
        const [{code, password, password1}, option ] = [ req.body, { new: true, useFindAndModify: false }] ;
        const update = {mat_khau: await hashPassWord(password)}
        const result = Admin.changePasswordWithCode(code, update, option);
        return result.success ? res.status(200).json(result) : res.status(400).json(result);
    },
    admin_get_notification: async function(req, res) {
        let {alert} = req.query;
        alert = alert ? {trang_thai: false} : {};
        const result = EditInfomation.getNotification(alert);
        return result.success ? res.status(200).json(result) : res.status(400).json(result);
    },
    update_123: async function(req, res) {
        NguoidungSchema.find(
            {loai: false},'_id'
    ).then( data=>{
        for( let i=0; i <data.length; i++)
        NguoidungSchema.findByIdAndUpdate(data._id, {$set: {trang_thai: true}}, { new: true, useFindAndModify: false })
        console.log('done')
    })
    .catch(err=>console.log(err))
}
};