export type Book = {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  rating: number;
  category: Category;
};

export type Category = {
  id: string;
  name: string;
};

export const fiction: Category = {
  id: "1",
  name: "Fiction",
};

export const nonFiction: Category = {
  id: "2",
  name: "Non-Fiction",
};

export const categories: Category[] = [fiction, nonFiction];

export const books: Book[] = [
  {
    id: "1",
    title: "Book 1",
    author: "Author 1",
    publishedDate: "Description 1",
    rating: 4.5,
    category: fiction,
  },
  {
    id: "2",
    title: "Book 2",
    author: "Author 2",
    publishedDate: "Description 2",
    rating: 4.0,
    category: nonFiction,
  },
  {
    id: "3",
    title: "Book 3",
    author: "Author 3",
    publishedDate: "Description 3",
    rating: 3.5,
    category: fiction,
  },
];
