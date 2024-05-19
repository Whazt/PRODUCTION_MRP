import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)}><ArrowLeftIcon className="w-6 h-6 m-2"/></button>
  );
};

export default BackButton;