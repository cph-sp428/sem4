import mongoose from "mongoose";

export type Task = {
    id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
}