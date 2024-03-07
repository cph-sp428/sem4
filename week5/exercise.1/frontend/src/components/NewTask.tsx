import { useMutation } from "@apollo/client";
import { GET_TASKS } from "../queries/queries";
import { ADD_TASK } from "../mutations/mutations";
import { Task } from "../types/Task";
import mongoose from "mongoose";
import { useState } from "react";
import { Link } from "react-router-dom";

function NewTask() {
  const emptyTask: Task = {
    id: new mongoose.Types.ObjectId(),
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  };
  const [currentTask, setCurrentTask] = useState<Task>(emptyTask);
  const [addTask] = useMutation(ADD_TASK, {
    refetchQueries: [{ query: GET_TASKS}],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask({
      variables: {
        title: currentTask.title,
        description: currentTask.description,
        dueDate: currentTask.dueDate,
      },
    });
    alert("Task added");
    setCurrentTask(emptyTask);
  };

  return (
    <div id="NewTaskContainer">
      <h2>New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={currentTask.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={currentTask.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="text"
            id="dueDate"
            name="dueDate"
            value={currentTask.dueDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Task</button>
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </form>
    </div>
  );
}

export default NewTask;
