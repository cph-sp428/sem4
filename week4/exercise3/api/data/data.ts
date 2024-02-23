import { PersonType, AddressType } from '../src/model/types';

const johnDoe: PersonType= {
    id: "1",
    name: 'John Doe',
    email: 'johndoe@email.com',
    age: 25,
};

const janeDoe: PersonType= {
    id: "2",
    name: 'Jane Doe',
    email: 'janedoe@email.com',
    age: 27
};

const address1: AddressType = {
    id: "1",
    street: '123 Main St',
    city: 'Anytown',
    state: 'NY',
    zip: 12345
};

const address2: AddressType = {
    id: "2",
    street: '456 Elm St',
    city: 'Othertown',
    state: 'CA',
    zip: 54321
};

export const people: PersonType[] = [
    {...johnDoe, addresses: [address1]},
    {...janeDoe, addresses: [address2]}
];

export const addresses: AddressType[] = [
    {...address1, people: [johnDoe]}, 
    {...address2, people: [janeDoe]}
];