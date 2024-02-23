import mongoose from "mongoose";
import { AuthorType } from "../types/types";

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
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    statics: {
        // alternative way to define a static method
    },
    virtuals: {
        // alternative way to define a virtual field
    }
});

authorSchema.statics.findAuthorsWithMultipleBooks = function() {
    return this.find().filter((author: AuthorType) => {
        author.books !== undefined && author.books.length > 1;
    });
}

authorSchema.virtual("nameCapitalized").get(function (this: AuthorType) {
    return this.name.toUpperCase();
});

authorSchema.pre(/^save/, function (next) {
    (this as any).populate("createdAt", Date.now());
    next();
});

const authorModel = mongoose.model('author', authorSchema);
export default authorModel;