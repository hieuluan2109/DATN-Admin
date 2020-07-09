const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    ma_sv: {
        required: true,
        unique: true,
        type: String,
    },
    ho: {
        required: true,
        type: String,
    },
    ten: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        unique: true,
        type: String,
    },
    anh_dai_dien: String,
    ngay_sinh: {
        required: true,
        type: String,
    },
    mat_khau: {
        required: true,
        type: String,
    },
    nguoi_tao: {
        type: Schema.Types.ObjectId, ref: 'NguoiDung'
    },
});
module.exports = mongoose.model('SinhVien', AdminSchema, 'nguoi_dung');