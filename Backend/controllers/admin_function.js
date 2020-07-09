const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports = {
    capitalizeFirstLetter: function (string) {
        return string
            .trim()
            .replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    },
    sign_token: function (user) {
        const payload = {
            _id: user._id,
            email: user.email,
            loai: true,
            ho: user.ho,
            ten: user.ten
        };
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    },
    // hashPassWord: async function(password) {     return await
    // bcrypt.hash(password, 10 ) }
    hashPassWord: function (password) {
        return bcrypt.hash(password, 10)
    },
}
