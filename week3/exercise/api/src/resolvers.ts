import data from './data.ts';
import { User, Book, Person, Address } from "./types.ts";


const users: User[] = data.users;
const books: Book[] = data.books;
const persons: Person[] = data.persons;
const addresses: Address[] = data.addresses;

export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    users: () => users,
    user: (parent: any, args: any, context: any, info: any) => {
      return users.find((user) => user.id === args.id);
    },
    books: () => books,
    book: (parent: any, args: any, context: any, info: any) => {
      return books.find((book) => book.id === args.id);
    },
    category: (parent: any, args: any, context: any, info: any) => {
      return books.filter((book) => book.category === args.name);
    },
    person: (parent: any, args: any, context: any, info: any) => {
      return persons.find((person) => person.id === args.id);
    },
    persons: () => persons,
    addresses: () => addresses,
    addressesByZipCode: (parent: any, args: any, context: any, info: any) => {
      return addresses.filter((address) => address.postalCode === args.zipCode);
    },
  },

  Mutation: {
    createUser: (_parent: never, args: User, _context: never, _info: never) => {
      const newUser = {
        id: String(users.length + 1),
        name: args.name,
        email: args.email,
        age: args.age,
      };
      users.push(newUser);
      return newUser;
    },
    createBook: (_parent: never, args: Book, _context: never, _info: never) => {
      const newBook = {
        id: books.length + 1,
        title: args.title,
        author: args.author,
        publishedDate: args.publishedDate,
        category: args.category,
        rating: args.rating,
      };
        books.push(newBook);
        return newBook;
    },
    updateBook: (_parent: never, args: Book, _context: never, _info: never) => {
        const book = books.find((book) => book.id === args.id);
        
    },
    createPerson: (_parent: never, args: Person, _context: never, _info: never) => {
      const newPerson = {
        id: persons.length + 1,
        name: args.name,
        email: args.email,
        age: args.age,
        addresses: [],
      };
      persons.push(newPerson);
      return newPerson;
    },
    createAddress: (_parent: never, args: Address, _context: never, _info: never) => {
      const newAddress = {
        id: addresses.length + 1,
        city: args.city,
        country: args.country,
        postalCode: args.postalCode,
        persons: [],
      };
      addresses.push(newAddress);
      return newAddress;
    },
    addPersonToAddress: (_parent: never, args: { personId: number, addressId: number }, _context: never, _info: never) => {
      const person: Person | undefined = persons.find((person) => person.id === args.personId);
      const address: Address | undefined = addresses.find((address) => address.id === args.addressId);
      if (person && address) {
        address.persons.push(person);
        person.addresses.push(address);
      }
      return address;
    },
    removePersonFromAddress: (_parent: never, args: { personId: number, addressId: number }, _context: never, _info: never) => {
      const person: Person | undefined = persons.find((person) => person.id === args.personId);
      const address: Address | undefined = addresses.find((address) => address.id === args.addressId);
      if (person && address) {
        address.persons = address.persons.filter((p) => p.id !== person.id);
        person.addresses = person.addresses.filter((a) => a.id !== address.id);
      }
      return address;
    },
    deletePerson: (_parent: never, args: { id: number }, _context: never, _info: never) => {
      const personIndex = persons.findIndex((person) => person.id === args.id);
      if (personIndex !== -1) {
        const person = persons[personIndex];
        persons.splice(personIndex, 1);
        person.addresses.forEach((address) => {
          address.persons = address.persons.filter((p) => p.id !== person.id);
        });
        return person;
      }
      return null;
    },
  },
};