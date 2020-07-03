const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    ho: {
        required: true,
        type: String
    },
    ten: {
        required: true,
        type: String
    },
    anh_dai_dien: String,
    ngay_sinh: {
        required: true,
        type: String
    },
    mat_khau: {
        required: true,
        type: String
    },
    loai: {
        required: true,
        type: String
    },

// AdminSchema
//     .virtual('ho_ten')
//     .get(function () {
//         return this.ho + ' ' + this.ten ;
//     })

module.exports = mongoose.model('AdminSchema', AdminSchema, 'nguoi_dung');