import mongoose from 'mongoose';
import argon2 from 'argon2';

// interface IUser {
//     username: string;
//     password: string;
// }

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema);

export {User}