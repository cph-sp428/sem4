import { people, addresses } from "../data/data";
import { Person, Address } from "../data/types";

export const resolvers = {
  Query: {
    people: () => people,
    addresses: () => addresses,
    addressesByZipCode: (_parent: never, args: { zip: number }) =>
      addresses.filter((a) => a.zip === args.zip),
  },

  Mutation: {
    addPerson: (_parent: never, args: Person, _context: never, _info: never) => {
        const newPerson = {
            id: "" + (people.length + 1),
            name: args.name,
            email: args.email,
            age: args.age,
            addresses: [],
          };
          people.push(newPerson);
          return newPerson;
    },
    addAddress: (_parent: never, args: Address, _context: never, _info: never) => {
        const newAddress = {
            id: "" + (addresses.length + 1),
            street: args.street,
            city: args.city,
            state: args.state,
            zip: args.zip,
            people: [],
          };
          addresses.push(newAddress);
          return newAddress;
    },
    addPersonToAddress: (
      parent: any,
      args: { personId: string; addressId: string }
    ) => {
      const person = people.find((p) => p.id === args.personId);
      const address = addresses.find((a) => a.id === args.addressId);
      if (person && address) {
        person.addresses = person.addresses || [];
        person.addresses.push(address);
        address.people = address.people || [];
        address.people.push(person);
      }
      return address;
    },
    removePersonFromAddress: (
      parent: any,
      args: { personId: string; addressId: string }
    ) => {
      const person = people.find((p) => p.id === args.personId);
      const address = addresses.find((a) => a.id === args.addressId);
      if (person && address) {
        person.addresses = person.addresses?.filter((a) => a.id !== address.id);
        address.people = address.people?.filter((p) => p.id !== person.id);
      }
      return address;
    },
    deletePerson: (parent: any, args: { id: string }) => {
      const person = people.find((p) => p.id === args.id);
      if (person) {
        people.splice(people.indexOf(person), 1);

        for (const address of addresses) {
          address.people = address.people?.filter((p) => p.id !== person.id);
        }
      }
      return person;
    },
    deleteAddress: (parent: any, args: { id: string }) => {
      const address = addresses.find((a) => a.id === args.id);
      if (address) {
        addresses.splice(addresses.indexOf(address), 1);

        for (const person of people) {
          person.addresses = person.addresses?.filter((a) => a.id !== address.id);
        }
      }
      return address;
    },
  },
};
