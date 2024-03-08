import mongoose from "mongoose";
import ownerModel from "./ownerModel";
import petModel from "./petModel";
import { Owner } from "./types";

const typeDefs = `#graphql
    type Query {
        getAllPets: [Pet],
        getPet(id: ID!): Pet,
        getAllOwners: [Owner],
        getOwner(id: ID!): Owner,
    }

    type Mutation {
        addOwner(name: String!, age: Int!): Owner,
        addPet(name: String!, species: String!, age: Int!, ownerId: ID!): Pet,
        updateOwner(id: ID!, name: String, age: Int): Owner,
        updatePet(id: ID!, name: String, species: String, age: Int, ownerId: ID): Pet,
        deleteOwner(id: ID!): Owner,
        deletePet(id: ID!): Pet,
    }

    type Owner {
        id: ID!
        name: String!
        age: Int!
        pets: [Pet]
    }

    type Pet {
        id: ID!
        name: String!
        species: String!
        age: Int!
        owner: Owner!
    }


    `;

const resolvers = {
  Query: {
    getAllPets: async (parent: any, args: any, context: any) => {
      return petModel.find({});
    },
    getPet: async (parent: any, args: any, context: any) => {
        return petModel.findById(args.id);
    },
    getAllOwners: async (parent: any, args: any, context: any) => {
        return ownerModel.find({});
    },
    getOwner: async (parent: any, args: any, context: any) => {
        return ownerModel.findById(args.id);
    },
  },
  Mutation: {
    addOwner: async (parent: any, args: any, context: any) => {
      let onwer = await ownerModel.create({ name: args.name, age: args.age });
      return await onwer.save();
    },
    addPet: async (parent: any, args: any, context: any) => {
      if(!mongoose.Types.ObjectId.isValid(args.ownerId)) throw new Error("Owner not found");
      const owner = await ownerModel.findById(args.ownerId);
      if (!owner) {
        throw new Error("Owner not found");
      }
      const pet = await petModel.create({ name: args.name, species: args.species, age: args.age, owner: args.ownerId });

      owner.pets.push(args.ownerId);
      await owner.save();
      return await pet.save();

    },
    updateOwner: async (parent: any, args: any, context: any) => {
      return ownerModel.findByIdAndUpdate(args.id, { name: args.name, age: args.age }, { new: true })
    },
    updatePet: async (parent: any, args: any, context: any) => {
      return petModel.findByIdAndUpdate(args.id, { name: args.name, species: args.species, age: args.age, owner: args.ownerId }, { new: true })
    },
    deleteOwner: async (parent: any, args: any, context: any) => {
      return ownerModel.findByIdAndDelete(args.id);
    },
    deletePet: async (parent: any, args: any, context: any) => {
      return petModel.findByIdAndDelete(args.id);
    },
  },
};
export { typeDefs, resolvers };
