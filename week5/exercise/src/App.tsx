import { useState } from "react";
import "./App.css";
import { task, exampleTasks } from "./data";

function App() {
  const emptyTask: task = {
    title: "",
    description: "",
    status: "active",
  };

  const [tasks, setTasks] = useState<task[]>(exampleTasks);
  const [currentTask, setCurrentTask] = useState<task>({ ...emptyTask });

  const handleComplete = (id: number) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.status = "done";
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleEdit = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setCurrentTask(taskToEdit);
    }
  };

  const handleDelete = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTask.id) {
      const newTasks = tasks.map((task) => {
        if (task.id === currentTask.id) {
          return currentTask;
        }
        return task;
      });
      setTasks(newTasks);
    } else {
      const newTasks = [...tasks, { ...currentTask, id: tasks.length + 1 }];
      setTasks(newTasks);
    }
    setCurrentTask({ ...emptyTask });
  }

  return (
    <>

      <h1>Tasks</h1>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: task) => (
            <tr key={task.id}>
              <td>
                <button onClick={() => handleComplete(task.id!)}>
                  Complete
                </button>
              </td>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => handleEdit(task.id!)}>Edit</button>
                <button onClick={() => handleDelete(task.id!)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form>
        <input
          type="text"
          value={currentTask.title}
          onChange={(e) =>
            setCurrentTask({ ...currentTask, title: e.target.value })
          }
        />
        <input
          type="text"
          value={currentTask.description}
          onChange={(e) =>
            setCurrentTask({ ...currentTask, description: e.target.value })
          }
        />
        <button type="submit" onSubmit={handleFormSubmit}>Submit</button>
      </form>
    </>
  );
}

export default App;
