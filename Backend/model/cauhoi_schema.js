const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CauHoiSchema = new Schema({
    version: {
        type: Number,
        default: 1,
        required: true
    },
    noi_dung: {
        type: String,
        required: true
    },
    dap_an_a: {
        type: String,
    },
    dap_an_b: {
        type: String,
    },
    dap_an_c: {
        type: String,
    },
    dap_an_d: {
        type: String,
    },
    dap_an_dung: {
        type: String,
        required: true
    },
    nguoi_tao_id: {
        type: Schema.Types.ObjectId,
        ref: 'NguoiDung'
    }, 
    danh_muc_id: {
        type: Schema.Types.ObjectId,
        ref: 'DanhMuc'
    },
    la_version_moi_nhat: {
        type: Boolean,
        default: true,
    },
    diem: {
        type: Number,
        required: true,
        default: 1,
    }
}, {timestamps: true});
module.exports = mongoose.model('CauHoi', CauHoiSchema, 'cau_hoi');