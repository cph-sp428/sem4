import mongoose from "mongoose";
import { BookType } from "../types/types";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    ref: "title",
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
    required: true,
  },
  library: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "library",
    required: true,
  },
  pages: {
    type: Number,
    required: false,
  },
  genre: {
    type: String,
    required: true,
    enum: [
      "fiction",
      "non-fiction",
      "fantasy",
      "mystery",
      "thriller",
      "romance",
      "biography",
      "history",
      "science",
      "other",
    ],
  },
  }
);

bookSchema.pre<BookType>(/^find/, function (next) {
  (this as any).populate({ path: "author", select: "name" });
  next();
});

bookSchema.pre<BookType>(/^save/, function (next) {
  (this as any).populate({ path: "author", select: "name" });
});

const bookModel = mongoose.model("book", bookSchema);
export default bookModel;