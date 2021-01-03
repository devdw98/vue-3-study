import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: true
    // },
    // writer: {

    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'user',
    //     required: true
    // },
    memo: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);
export {Post}