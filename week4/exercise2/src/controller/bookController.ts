import bookModel from "../model/bookModel";
import authorModel from "../model/authorModel";
import libraryModel from "../model/libraryModel";
import { BookType } from "../types/types";
import ApiError from "../errors/ApiError";
import mongoose from "mongoose";

async function createBook(book : BookType) {
    return await bookModel.create(book);
}

async function getBooks() {
    const books : BookType[] = await bookModel.find();
    return books;
}

async function getBookById(id: string) {
    const book: BookType | null = await bookModel.findById(id);
    if(book === null) {
        throw new ApiError(404,"Book not found");
    }
    return book;
}

async function getBookByTitle(title: string){
    const book: BookType | null = await bookModel.findOne({title});
    if(book === null) {
        throw new ApiError(404,"Book not found");
    }
    return book;

}

async function updateBookById(id: string, book : BookType) {
    const updatedBook: BookType | null = await bookModel.findByIdAndUpdate(id, book, {new: true})
    if(updatedBook === null) {
        throw new ApiError(404,"Book not found");
    }
    return updatedBook;
};

async function DeleteBookById(id: string) {
    const book: BookType | null = await bookModel.findByIdAndDelete(id);
    if(book === null) {
        throw new ApiError(404,"Book not found");
    }
    return book;
}

async function addBookToAuthor(authorId: mongoose.Types.ObjectId | undefined, bookId: mongoose.Types.ObjectId | undefined) {
    
    if(authorId === undefined || bookId === undefined) {
        throw new ApiError(400,"invalid id provided");
    }
    
    const author = await authorModel.findById(authorId);
    const book = await bookModel.findById(bookId);
    if(author === null) {
        throw new ApiError(404,"Author not found");
    } else if(book === null) {
        throw new ApiError(404,"Book not found");
    }
    if(author.books.some(book => book.id as unknown as mongoose.Types.ObjectId === bookId)) {
        throw new ApiError(400,"Book already added to author");
    }
    author.books.push(bookId as unknown as mongoose.Types.ObjectId);
    book.author = authorId as unknown as mongoose.Types.ObjectId;

    await author.save();
    await book.save();
    
    return author.populate("books");
}

async function addBookToLibrary(libraryId: mongoose.Types.ObjectId | undefined, bookId: mongoose.Types.ObjectId | undefined) {
    if(libraryId === undefined || bookId === undefined) {
        throw new ApiError(400,"invalid id provided");
    }
    const library = await libraryModel.findById(libraryId);
    const book = await bookModel.findById(bookId);
    if(library === null) {
        throw new ApiError(404,"Library not found");
    } else if(book === null) {
        throw new ApiError(404,"Book not found");
    }
    if(library.books.some(book => book.id as unknown as mongoose.Types.ObjectId === bookId)) {
        throw new ApiError(400,"Book already added to library");
    }
    library.books.push(bookId);
    book.library = libraryId;

    await library.save();
    await book.save();

    return library.populate("books");
}

export default {
    createBook,
    getBooks,
    getBookById,
    getBookByTitle,
    updateBookById,
    addBookToAuthor,
    addBookToLibrary
}