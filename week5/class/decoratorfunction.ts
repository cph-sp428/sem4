import personController from "../controller/personController";
import addressController from "../controller/addressController";
import { PersonType, AddressType } from "../model/types";



const logResolve = (role : string, resolve : any) => {
    return function(parent : any, args: any, context: any, info: any) {
        console.log(`Args: ${JSON.stringify(args)}`);
        return resolve(parent, args, context, info);
    }

}

const personController = {
    getAllPeople = () => {}
}

export const resolvers = {
  Query: {
    people: () => personController.getAllPeople(),
    addresses: () => addressController.getAllAddresses(),
    addressesByZipCode: (_parent: never, args: { zip: number }) =>
      addressController.getAddressesByZipCode(args.zip)
  },

  Mutation: {
    addPerson: (
      _parent: never,
      args: PersonType,
      _context: never,
      _info: never
    ) => {
      return personController.createPerson(args);
    },
    addAddress: (
      _parent: never,
      args: AddressType,
      _context: never,
      _info: never
    ) => {
      return addressController.createAddress(args);
    },
    addPersonToAddress: (
      parent: any,
      args: { personId: string; addressId: string }
    ) => {
      return addressController.addPersonToAddress(
        args.personId,
        args.addressId
      );
    },
    removePersonFromAddress: (
      parent: any,
      args: { personId: string; addressId: string }
    ) => {
      return addressController.removePersonFromAddress(
        args.personId,
        args.addressId
      );
    },
    deletePerson: (parent: any, args: { id: string }) => {
      return personController.deletePerson(args.id);
    },
    deleteAddress: (parent: any, args: { id: string }) => {
      return addressController.deleteAddress(args.id);
    },
  },
};
