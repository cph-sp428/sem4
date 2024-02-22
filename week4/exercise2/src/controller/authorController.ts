import authorModel from "../model/authorModel";
import { authorType } from "../types/types";
import ApiError from "../errors/ApiError";
import { mongo } from "mongoose";
import { Auth } from "mongodb";

async function createAuthor(name: string, age: number) {
  return await authorModel.create({
    name,
    age,
    books: new Array<mongo.ObjectId>(),
    createdAt: new Date(),
  });
}

async function getAuthors() {
  const authors: authorType[] = await authorModel.find();
  return authors;
}

async function getAuthorByName(name: string) {
  const author: authorType | null = await authorModel.findOne({name})
  if (author === null) {
    throw new ApiError(404, "Author not found");
  }
  return author;
}

async function getAuthorById(id: string) {
  const author: authorType | null = await authorModel.findById(id);
  if (author === null) {
    throw new ApiError(404, "Author not found");
  }
  return author;
}

async function updateAuthorById(id: string, name: string, age: number) {
  const author: authorType | null = await authorModel.findByIdAndUpdate(
    id,
    { name, age },
    { new: true }
  );
  if (author === null) {
    throw new Error("Author not found");
  }
  return author;
}

async function deleteAuthorById(id: string) {
  const author: authorType | null = await authorModel.findByIdAndDelete(id);

  if (author === null) {
    throw new Error("Author not found");
  }
  return author;
}

export default {
  createAuthor,
  getAuthorByName,
  getAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
};
