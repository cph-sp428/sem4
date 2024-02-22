import mongoose from 'mongoose';

type AuthorType = {
    id?: mongoose.Types.ObjectId,
    name: String,
    age: Number,
    books?: Array<mongoose.Schema.Types.ObjectId>,
    createdAt: Date
}

type BookType = {
    id?: mongoose.Types.ObjectId,
    title: String,
    author?: mongoose.Schema.Types.ObjectId,
    library?: mongoose.Schema.Types.ObjectId,
    pages: Number,
    genre: 'fiction'| 'non-fiction'| 'fantasy'| 'mystery'| 'thriller'| 'romance'| 'biography'| 'history'| 'science'| 'other',
    createdAt?: Date
}

type LibraryType = {
    id?: mongoose.Types.ObjectId,
    name: String,
    books?: [],
    createdAt: Date
}

export {AuthorType, BookType, LibraryType}