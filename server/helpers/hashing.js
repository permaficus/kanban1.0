require('dotenv').config();
const bcrypt = require('bcrypt');
const sRound = Number(process.env.BCRYPT_SALT);

module.exports = {

    hashPassword: function (password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, sRound, (err, hash) => {
                err ? reject(err) : resolve(hash)
            })
        })
    },

    doCompare: function (plain, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plain, hash, (err, result) => {
                err ? reject(err) : resolve(result)
            })
        })
    }

}