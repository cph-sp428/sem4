import mongoose from "mongoose";
import { PersonType } from "../types";

const personSchema = new mongoose.Schema({
    ObjectId: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    addresses: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

const personModel = mongoose.model('person', personSchema);
export default personModel;