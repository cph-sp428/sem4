import { useQuery } from "@apollo/client";
import { GET_TASKS } from "../queries/queries";
import '../styles/TaskView.css';

function TaskView() {

    const { loading, error, data } = useQuery(GET_TASKS);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (  
        <>
        <h1>Tasks</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Completed</th>
                </tr>
            </thead>
            <tbody>
                {data.tasks.map((task: any) => (
                    <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.completed ? "Yes" : "No"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}

export default TaskView;
