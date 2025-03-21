const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    department: {
        type: String,
        required: false,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default:'student',
        enum: ['admin', 'student'],
        required: true
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if password is modified
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

const User = mongoose.model('users', userSchema);

module.exports = User;
