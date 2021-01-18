const {validationResult} = require('express-validator');
const Admin = require('../model/Admin');
module.exports = {
    admin_change_password: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({'success': false, 'errors': errors.array()})
        };
        const [_id,{password, password1 }, option ] = [ req.user ,req.body, { new: true, useFindAndModify: false }]
        const result = Admin.changePassword(_id,password, password1, option);
        result.success ? res.status(200).json(result) : res.status(400).json(result);
    },
    admin_update_profile: async function (req, res) {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({'success': false, 'errors': errors.array()})
        };
        const [{ ho, ten, ngay_sinh, anh_dai_dien, gioi_tinh, sdt}, option] = [ req.body, { new: true, useFindAndModify: false }];
        const update = !anh_dai_dien 
                        ? { 'ho': ho, 'ten': ten, 'ngay_sinh': ngay_sinh, 'gioi_tinh': !(Boolean(gioi_tinh)), 'sdt': sdt }
                        : {'anh_dai_dien': anh_dai_dien};
        const result = Admin.updateProfile(req.user._id, update);
        result.success ? res.status(200).json(result) : res.status(400).json(result);
    },
    admin_get_profile: async function (req, res) {
        const result = Admin.getProfile(req.user._id);
        result.success ? res.status(200).json(result) : res.status(400).json(result);
    },
    admin_forgot_password: async function(req, res, next) {
        const {email} = req.body;
        await NguoidungSchema
            .findOne({'email': email, 'loai': true})
            .then( async (data)=>{
                const code = await makeCode();
                sendForgotPasswordMail(email, code, data.ho+' ' + data.ten)
                const newRC = new QuenMatKhau({
                    code: code,
                    email: email
                });
                newRC.save()
                .then(s=> console.log(s))
                .catch(err => console.log(err));
                res.status(200).json({'success': true})
            })
            .catch(err=>{
                return res.status(400).json({'success': false, 'msg': 'Không tồn tại email '+email})
            })
    },
    admin_change_password_with_code: async function (req, res) {
        const [{code, password, password1}, option ] = [ req.body, { new: true, useFindAndModify: false }] ;
        const update = {mat_khau: await hashPassWord(password)}
        await Schema.QuenMatKhau.findOne({code: code, expire: {$gt: Date.now()}})
        .then(user => {
            console.log(user)
            QuenMatKhau.findOneAndUpdate({'code': code}, {'expire': -user.expire}, option)
            .then(up => { console.log(up) }).catch(err => console.log(err))
            NguoidungSchema.findOneAndUpdate({email: user.email}, { $set: update }, option) 
            .then(updated=> res.status(200).json({'success': true, 'msg': 'Chỉnh sửa mật khẩu thành công'}))
            .catch(err => res.status(400).json({'success': false, 'errors': 'Lỗi không xác định'})) 
            })
        .catch(err => res.status(400).json({success: false, msg: 'Mã code đã hết hạn'}))
    },
    admin_get_notification: async function(req, res) {
        let {alert} = req.query;
        alert = alert ? {trang_thai: false} : {};
        await SuaThongTin.find(alert)
        .populate('nguoi_dung_id', ['ho', 'ten', 'anh_dai_dien', 'email'])
        .then(data=>{
            res.status(200).json({success: true,data})
        })
        .catch(err=>{
            res.status(400).json({success: false, errors: 'Lỗi không xác định'})
        })
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