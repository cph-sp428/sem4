import { useNavigate } from "react-router-dom";

function ErrorPage() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/home")
    }

  return (
    <div className="main-div">
      <div className=" bg-slate-700 text-center justify-center center$">
        <h1>404 - something went wrong</h1>
        <h2>no permission or endpoint</h2>
        <button onClick={handleClick}>Go back</button>
      </div>
    </div>
  );
}

export default ErrorPage;
