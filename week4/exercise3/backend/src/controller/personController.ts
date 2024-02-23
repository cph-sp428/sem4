import personModel from "../model/personModel";
import { PersonType } from "../types";

async function createPerson(person: PersonType) {
    return await personModel.create(person);
}

async function getPersonById(id: string) {
    return await personModel.findById(id);
};

async function getAllPeople() {
    return await personModel.find();
}

async function updatePerson(id: string, person: PersonType) {
    return await personModel.findByIdAndUpdate(id, person);
};

async function deletePerson(id: string) {
    return await personModel.findByIdAndDelete(id);
};

export default {
    createPerson,
    getPersonById,
    getAllPeople,
    updatePerson,
    deletePerson
};