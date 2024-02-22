import mongoose from "mongoose";
import authorController from "./controller/authorController";
import bookController from "./controller/bookController";
import libraryController from "./controller/libraryController";
import { AuthorType, BookType, LibraryType } from "./types/types";

const URL =
  "mongodb+srv://cphsp428:b4UWIXoabyBp00c4@cluster0.7pyzfcv.mongodb.net/library";

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(URL);

    let author = await authorController.getAuthorByName("J.K. Rowling");
    let library = await libraryController.getLibraryByName("Copenhagen Library");
    let book = await bookController.getBookByTitle("The Hobbit");
    
    //let newAuthor = await bookController.addBookToAuthor(author.id, book.id);

    // const populatedLibrary = await bookController.addBookToLibrary(library.id, book.id);
    // console.log(populatedLibrary);

    let myBook = await bookController.getBookById("65d74ea8b83a5c6bbb788117");
    console.log(myBook);

  } catch (err) {
    console.log(err);
  } finally {
    mongoose.disconnect();
  }
}
