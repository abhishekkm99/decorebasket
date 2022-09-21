const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    passwordHash: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    }

})
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
})


userSchema.set("toJSON", {
  virtuals: true,
})

const User = mongoose.model('User', userSchema);
module.exports = User;