export type User = {
  id: string;
  name: string;
  email: string;
  age: number;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  category: string;
  rating: number;
};

export type Person = {
  id: number;
  name: string;
  email: string;
  age: number;
  address: Address;
};

export type Address = {
  id: number;
  city: string;
  country: string;
  postalCode: number;
  persons: Person[];
};
