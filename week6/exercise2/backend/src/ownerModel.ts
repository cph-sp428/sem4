import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
    age: {
        type: Number,
        required: true,
    },
    pets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pet',
        }
    ]
});

const ownerModel = mongoose.model('Owner', ownerSchema);
export default ownerModel;