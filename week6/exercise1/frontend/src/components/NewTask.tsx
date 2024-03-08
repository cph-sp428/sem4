import { useMutation } from "@apollo/client";
import { GET_TASKS } from "../queries/queries";
import { ADD_TASK } from "../mutations/mutations";
import { Task } from "../types/Task";
import mongoose from "mongoose";
//import { useState } from "react";
import { signal } from "@preact/signals-react";
import { Link } from "react-router-dom";

function NewTask() {
  const emptyTask: Task = {
    id: new mongoose.Types.ObjectId(),
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  };
  const currentTask = signal<Task>(emptyTask);
  //const [currentTask, setCurrentTask] = useState<Task>(emptyTask);
  const [addTask] = useMutation(ADD_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask({
      variables: {
        title: currentTask.value.title,
        description: currentTask.value.description,
        dueDate: currentTask.value.dueDate,
      },
    });
    alert("Task added");
    currentTask.value = emptyTask;
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
            value={currentTask.value.title}
            onChange={(e) => {
              currentTask.value.title = e.target.value;
            }}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={currentTask.value.description}
            onChange={(e) => { currentTask.value.description = e.target.value; }}
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="text"
            id="dueDate"
            name="dueDate"
            value={currentTask.value.dueDate}
            onChange={(e) => { currentTask.value.dueDate = e.target.value; } }
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
