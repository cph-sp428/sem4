import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    text: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;