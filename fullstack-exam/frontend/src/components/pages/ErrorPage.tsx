import { useNavigate } from "react-router-dom";

function ErrorPage() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/home")
    }

  return (
    <div id="main-div" className=" ">
      <div className=" text-center justify-center center$">
        <h1>404 - something went wrong</h1>
        <h2>no permission or endpoint</h2>
        <button 
        className=" bg-slate-400 hover:bg-orange-300 border:bg-gray-100 text-white font-bold py-2 px-4 rounded-full mt-4"
        onClick={handleClick}>Go back</button>
      </div>
    </div>
  );
}

export default ErrorPage;
