import mongoose from 'mongoose';

export type Person = {
    id?: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    age: number;
    addresses: mongoose.Schema.Types.ObjectId[];
};

export type Address = {
    id?: mongoose.Schema.Types.ObjectId;
    street: string;
    city: string;
    state: string;
    zip: number;
    people: mongoose.Schema.Types.ObjectId[];
};
