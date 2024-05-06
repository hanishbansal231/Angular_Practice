import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'The firstName field is required']
    },
    lastName: {
        type: String,
        required: [true, 'The lastName field is required']
    },
    email: {
        type: String,
        required: [true, 'The email field is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'The Password field is required'],
        match: [
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number'
        ]
    },
    access_token: String,
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
    comparePassword: async function (originalPassword) {
        return await bcrypt.compare(originalPassword, this.password);
    },
    generateToken: async function () {
        return jwt.sign({
            email: this.email,
            id: this._id,
        }, process.env.ACESS_TOKEN_SECRET, {
            expiresIn: process.env.ACESS_TOKEN_EXPIRY
        })
    }
}


const User = model('User', userSchema);
export default User;