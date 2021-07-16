const mongoose = require('mongoose')
const crypto = require('crypto')
// const uuidv1 = require("uuid/v1")
const {
    v1: uuidv1
} = require('uuid')

const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: 'string',
        trim: true,
        required: true,
        unique: true
    },
    hashed_password: {
        type: 'string',
        required: true,
    },
    salt: 'string',
    role: {
        type: Number,
        default: 0,
    },
    about: {
        type: 'string',
        trim: true,
    },
    history: {
        type: Array,
        default: []
    },

}, {
    timestamps: true
});


//Virtual Field

userSchema.virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = uuidv1()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    })

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (e) {
            return '';
        }
    }
}

module.exports = mongoose.model("User", userSchema);