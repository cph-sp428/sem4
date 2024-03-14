import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    username : {
        type: String,
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
    }
});

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;