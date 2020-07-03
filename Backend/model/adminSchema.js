const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    ho: {
        type: String
    },
    ten: {
        type: String
    },
    anh_dai_dien: String,
    ngay_sinh: Date,
    mat_khau: String,
    loai: Boolean
});

// AdminSchema
//     .virtual('ho_ten')
//     .get(function () {
//         return this.ho + ' ' + this.ten ;
//     })

module.exports = mongoose.model('AdminSchema', AdminSchema, 'nguoi_dung');