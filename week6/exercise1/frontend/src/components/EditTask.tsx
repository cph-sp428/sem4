import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TASK } from "../queries/queries";
import { UPDATE_TASK } from "../mutations/mutations";
import { Task } from "../types/Task";
import { useState } from "react";

function EditTask() {

    const { id } = useParams<{ id: string }>();
    const {loading,error,data} = useQuery(GET_TASK, {
        variables: { id: id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    const [tempTask, setTempTask] = useState<Task>(data.task);
    const [updateTask] = useMutation(UPDATE_TASK);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempTask({ ...tempTask, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateTask({
            variables: {
                id: data.task.id,
                title: data.task.title,
                description: data.task.description,
                dueDate: data.task.dueDate,
                completed: data.task.completed,
            },
        });
        alert("Task updated");
    };

    return (  
        <div id="EditTaskContainer">
            <form onSubmit={handleSubmit}>
                <h2>Edit Task</h2>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={tempTask.title}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={tempTask.description}
                    />
                </div>
                <div>
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        type="text"
                        id="dueDate"
                        name="dueDate"
                        value={tempTask.dueDate}
                    />
                </div>
                <div>
                    <label htmlFor="completed">Completed</label>
                    <input
                        type="checkbox"
                        id="completed"
                        name="completed"
                        checked={tempTask.completed}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditTask;