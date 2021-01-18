const {NguoidungSchema} = require('../schema/index.schema');
const {hashPassWord} = require('../controllers/helper/function.helper');
class Admin {
     changePassword = async (_id,password, password1, option) => {
        await NguoidungSchema
            .findOne({_id: _id})
            .exec( async (err, data) =>{
                if( !checkPassword(password, data.mat_khau) ) 
                    return {'success': false, 'errors': 'Mật khẩu cũ không đúng'};
                else {
                const update = { mat_khau: await hashPassWord(password1) };
                NguoidungSchema.findByIdAndUpdate(_id, { $set: update }, option, function (err, updated) { // need some attention
                    if(err || !updated)
                        return {'success': false, 'errors': 'Lỗi không xác định'};
                    return {'success': true, 'msg': 'Chỉnh sửa mật khẩu thành công', 'data': updated};
                })}
            })
    };
    updateProfile = async (_id, update) => {
        await NguoidungSchema.findByIdAndUpdate(_id, {
            $set: update
        }, option, function (err, updated) {
            if (err) 
                return {'success': false, 'errors': 'Lỗi không xác định'} 
            return {'success': true, 'msg': 'Cập nhật thành công', 'data':updated}
        })
    };
    getProfile = async (_id) => {
        await NguoidungSchema
            .findOne({_id: _id},['-mat_khau'])
            .exec((err, user) => {
                if (err) 
                    return {'success': false, 'errors': err};
                else {
                    let data = user.toObject();
                    data.createdAt = customDatetime(user.createdAt);
                    data.updatedAt = customDatetime(user.updatedAt);
                    data.ngay_sinh = customDatetime(user.ngay_sinh);
                    return {'success': true, 'data': data};
                }
            });
    }
}
module.exports = Admin;