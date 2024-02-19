import { Person, Address } from './types';

const johnDoe: Person= {
    id: "1",
    name: 'John Doe',
    email: 'johndoe@email.com',
    age: 25,
};

const janeDoe: Person= {
    id: "2",
    name: 'Jane Doe',
    email: 'janedoe@email.com',
    age: 27
};

const address1: Address = {
    id: "1",
    street: '123 Main St',
    city: 'Anytown',
    state: 'NY',
    zip: 12345
};

const address2: Address = {
    id: "2",
    street: '456 Elm St',
    city: 'Othertown',
    state: 'CA',
    zip: 54321
};

export const people: Person[] = [
    {...johnDoe, addresses: [address1]},
    {...janeDoe, addresses: [address2]}
];

export const addresses: Address[] = [
    {...address1, people: [johnDoe]}, 
    {...address2, people: [janeDoe]}
];