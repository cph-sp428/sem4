import { useQuery, useMutation } from "@apollo/client";
import { GET_TASKS } from "../queries/queries";
import { DELETE_TASK } from "../mutations/mutations";
import "../styles/TaskView.css";
import { Link, Outlet } from "react-router-dom";

function TaskView() {
  const { loading, error, data } = useQuery(GET_TASKS);
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div id="TaskViewContainer">
      <h1>Tasks</h1>
      <Link to="/newTask">New Task</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {data.tasks.map((task: any) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                {task.completed ? "Yes" : "No"}
              </td>
              <td>
                <Link to={`/editTask/${task.id}`}>Edit</Link>
              </td>
              <td>
                <Link
                  to="/"
                  onClick={() => {
                    deleteTask({
                      variables: {
                        id: task.id,
                      },
                    });
                  }}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Outlet />
    </div>
  );
}

export default TaskView;
