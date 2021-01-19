const {SuaThongTin} = require('../schema/index.schema');
class EditInfomation {
    getNotification = async (alert)=> {
        await SuaThongTin.find(alert)
            .populate('nguoi_dung_id', ['ho', 'ten', 'anh_dai_dien', 'email'])
            .then(data=>{
                return {success: true,data}
            })
            .catch(err=>{
                return {success: false, errors: 'Lỗi không xác định'}
            })
    }
}