import mongoose from "mongoose";

export type Owner = {
    id?: mongoose.Types.ObjectId;
    name: string;
    age: number;
    pets?: Pet[];
};

export type Pet = {
    id?: mongoose.Types.ObjectId;
    name: string;
    species: string;
    age: number;
    owner: Owner;
};
