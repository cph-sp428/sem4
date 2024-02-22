import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  books: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const libraryModel = mongoose.model("library", librarySchema);
export default libraryModel;