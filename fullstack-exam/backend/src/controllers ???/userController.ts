import userModel from "../models/userModel";
import { User } from "../types/User";

async function createUser(user: User) {
  return await userModel.create(user);
}

async function getUserById(id: string) {
  return await userModel.find({ _id: id });
}

async function getAllUsers() {
  return await userModel.find();
}

async function updateUser(id: string, user: User) {
    return await userModel.findByIdAndUpdate(id, user);
}

async function deleteUser(id: string) {
    return await userModel.findByIdAndDelete(id);
}

export default {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
}