export type Person = {
    id?: string;
    name: string;
    email: string;
    age: number;
    addresses?: Address[];
};

export type Address = {
    id?: string;
    street: string;
    city: string;
    state: string;
    zip: number;
    people?: Person[];
};
