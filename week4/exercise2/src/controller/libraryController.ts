import libraryModel from "../model/libraryModel";
import { LibraryType } from "../types/types";
import ApiError from "../errors/ApiError";

async function createLibrary(name: string, books: string[]){
  return await libraryModel.create({
    name,
    books,
    createdAt: new Date(),
  });
}

async function getLibraries() {
  const libraries: LibraryType[] = await libraryModel.find();
  return libraries;
}

async function getLibraryByName(name: string): Promise<LibraryType> {
  const library: LibraryType | null = await libraryModel.findOne({ name });
  if (library === null) {
    throw new ApiError(404, "Library not found");
  }
  return library;
}

async function getLibraryById(id: string) {
  const library: LibraryType | null = await libraryModel.findById(id);
  if (library === null) {
    throw new ApiError(404, "Library not found");
  }
  return library;
}

async function updateLibraryById(id: string, name: string, books: string[]) {
  const library: LibraryType | null = await libraryModel.findByIdAndUpdate(
    id,
    { name, books },
    { new: true }
  );
  if (library === null) {
    throw new Error("Library not found");
  }
  return library;
}

async function deleteLibraryById(id: string) {
  const library: LibraryType | null = await libraryModel.findByIdAndDelete(id);

  if (library === null) {
    throw new Error("Library not found");
  }
  return library;
}

async function removeBookFromLibrary(libraryId: string, bookId: string) {
  const library: LibraryType | null = await libraryModel.findById(libraryId);
  if (library === null) {
    throw new Error("Library not found");
  }
  const updatedBooks = library.books!.filter((id) => id !== bookId);
  return await libraryModel.findByIdAndUpdate(libraryId, { books: updatedBooks });
}

export default {
  createLibrary,
  getLibraries,
  getLibraryByName,
  getLibraryById,
  updateLibraryById,
  deleteLibraryById,
};
