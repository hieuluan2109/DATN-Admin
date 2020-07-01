const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    ob: String
});

module.exports = mongoose.model('AdminSchema', AdminSchema , 'bai_tap');