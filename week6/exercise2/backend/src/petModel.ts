import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    species: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    age: {
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
    }
});

const petModel = mongoose.model('Pet', petSchema);
export default petModel;