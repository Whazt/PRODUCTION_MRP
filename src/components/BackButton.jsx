import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";



const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    if (location.key === 'default') {
      
      navigate('/formulas');
    } else {
      
      navigate(-1);
    }
  };

  return (
    <button onClick={handleBackClick}><ArrowLeftIcon className="w-6 h-6 m-2"/></button>
  );
};

export default BackButton;