export type PersonType = {
    id?: string;
    name: string;
    email: string;
    age: number;
    addresses?: AddressType[];
};

export type AddressType = {
    id?: string;
    street: string;
    city: string;
    state: string;
    zip: number;
    people?: PersonType[];
};
