import mongoose from "mongoose";
import { AddressType } from "../types";

const addressSchema = new mongoose.Schema({
    ObjectId: mongoose.Schema.Types.ObjectId,
    street: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    state: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    zip: {
        type: Number,
        required: true,
        min: 0
    },
    people: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
});

const addressModel = mongoose.model('address', addressSchema);
export default addressModel;