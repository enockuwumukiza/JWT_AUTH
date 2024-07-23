import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLogoutMutation } from '../slice/usersApiSlice';
import Loading from './Loading';
import { clearCredentials } from '../slice/authSlice';
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async() =>{
    try {
      await logout();
      dispatch(clearCredentials());
      navigate('/login');

    } catch (err) {
      toast.error(err?.data?.message || err?.message || 'Error logging out!');
    }
  }
  if(isLoading){
    return <>
      <Loading/>
    </>
  }

  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:underline">MyApp</Link>
        </div>
        <div className="flex items-center space-x-4">
          {!userInfo && <Link to="/signup" className="hover:underline">Signup</Link>}
          {!userInfo && <Link to="/login" className="hover:underline">Login</Link>}
        </div>
        
        {userInfo && (
          <div className="ml-auto flex items-center space-x-4">
            {
              userInfo.name && <span className="text-gray-300">Logged in as {userInfo?.name}</span>
            }
            {
              userInfo?.name && <button
                onClick={handleLogout}
               className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
              Logout
            </button>
            }
          </div>
        )}
        {
          userInfo?.name && <div className="ml-auto flex items-center space-x-4">
          <button
          className="bg-teal-500 hover:bg-teal-600 text-white py-1 px-3 rounded">
            <Link to={'/profile'}>Update Profile</Link>
      </button>
          </div>
        }
      </div>
    </nav>
  );
};

export default Header;
