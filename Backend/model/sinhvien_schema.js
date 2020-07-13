const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    ma_sv: {
        required: true,
        unique: true,
        type: String
    },
    ho: {
        required: true,
        type: String
    },
    ten: {
        required: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    anh_dai_dien: String,
    ngay_sinh: {
        required: true,
        type: Date
    },
    mat_khau: {
        required: true,
        type: String
    },
    ds_lop_hoc: {
        type: Array,
        default: {},
    },
    nguoi_tao_id: {
        type: Schema.Types.ObjectId,
        ref: 'NguoiDung'
    },
}, {timestamps: true});
module.exports = mongoose.model('SinhVien', AdminSchema, 'sinh_vien');