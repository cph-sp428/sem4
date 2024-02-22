import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    ObjectId: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    books: {
        type: [mongoose.Schema.Types.ObjectId],
        
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

authorSchema.pre(/^save/, function (next) {
    (this as any).populate("createdAt", Date.now());
    next();
});

const authorModel = mongoose.model('author', authorSchema);
export default authorModel;