import { Task } from "../types/Task";
import taskModel from "../models/taskModel";

export const resolvers = {
  Query: {
    tasks: async (_parent: never, _args: never, _context: never) => await taskModel.find(),
    task: async (_parent: never, args: { id: string }, _context: never) => await taskModel.findById(args.id),
  },

  Mutation: {
    addTask: async (_parent: never, args: Task, _context: never) => {
      const newTask = new taskModel(args);
      return await newTask.save();
    },
    editTask: async (_parent: never, args: Task, _context: never) => {
      if(args.id){
        return await taskModel.findByIdAndUpdate(args.id, args, { new: true });
      }
    },
    deleteTask: async (_parent: never, args: { id: string }, _context: never) => {
      return await taskModel.findByIdAndDelete(args.id);
    },
  },
};
