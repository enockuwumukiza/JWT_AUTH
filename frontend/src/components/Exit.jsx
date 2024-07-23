import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearCredentials } from '../slice/authSlice';
import { useDispatch,useSelector } from 'react-redux';

const Exit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const handleExit = () =>{
    dispatch(clearCredentials());
    navigate('/login');
  }
  return (
   <>
    {
      userInfo &&  <div className="bottom-0 left-0 w-full bg-gray-800 text-white py-4 text-center shadow-lg">
      <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300" 
        onClick={handleExit}
      >
        Exit The App
      </button>
    </div>
    }
   </>
  );
};

export default Exit;
