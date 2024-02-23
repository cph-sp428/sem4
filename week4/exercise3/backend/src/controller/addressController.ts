import addressModel from "../model/addressModel";
import { AddressType } from "../types";

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

export default {
    createAddress,
    getAddressById,
    getAllAddresses,
    updateAddress,
    deleteAddress
}