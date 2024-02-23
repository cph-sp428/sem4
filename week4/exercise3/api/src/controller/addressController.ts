import mongoose, { ObjectId } from "mongoose";
import addressModel from "../model/addressModel";
import personModel from "../model/personModel";
import { AddressType, PersonType } from "../model/types";

async function createAddress(address: AddressType) {
    return await addressModel.create(address);
};

async function getAddressById(id: string) {
    return await addressModel.findById(id);
};

async function getAllAddresses() {
    return await addressModel.find();
}

async function updateAddress(id: string, address: AddressType) {
    return await addressModel.findByIdAndUpdate(id, address, { new: true });
};

async function deleteAddress(id: string) {
    return await addressModel.findByIdAndDelete(id);
}

async function getAddressesByZipCode(zip: number) {
    return await addressModel.find({ zip: zip});
}

async function addPersonToAddress(personId: string, addressId: string) {

    const personID = new mongoose.Types.ObjectId(personId);
    const addressID = new mongoose.Types.ObjectId(addressId);

    const person = await personModel.findById(personID);
    const address = await addressModel.findById(addressID);

    if(person?.addresses?.includes(addressID) || address?.people?.includes(personID)) {
        return null;
    }

    if(person && address) {
        person.addresses.push(address.id);
        address.people.push(person.id);
        await person.save();
        return await address.save();
    } else {
        return null;
    }
};

async function removePersonFromAddress(personId: string, addressId: string) {
    const person = await personModel.findById(personId);
    const address = await addressModel.findById(addressId);

    if(person?.addresses?.toString().includes(addressId) && address?.people?.toString().includes(personId)) {
        person.addresses = person.addresses.filter((address) => address.toString() !== addressId);
        address.people = address.people.filter((person) => person.toString() !== personId);
        await person.save();
        return await address.save();
    }
    return null;

};

export default {
    createAddress,
    getAddressById,
    getAllAddresses,
    updateAddress,
    deleteAddress,
    getAddressesByZipCode,
    addPersonToAddress,
    removePersonFromAddress
}