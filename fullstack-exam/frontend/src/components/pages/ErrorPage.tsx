import { useNavigate } from "react-router-dom";

interface ErrorPageProps {
  error? : Error
}

function ErrorPage( {error} : ErrorPageProps) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/home")
    }

  return (
    <div id="main-div" className=" ">
      <div className=" text-center justify-center center$">
        <h1>Something Went Wrong</h1>
        <h2>uh oh....</h2>
        <button 
        className=" bg-slate-400 hover:bg-orange-300 border:bg-gray-100 text-white font-bold py-2 px-4 rounded-full mt-4"
        onClick={handleClick}>Go back</button>
      </div>
    </div>
  );
}

export default ErrorPage;
