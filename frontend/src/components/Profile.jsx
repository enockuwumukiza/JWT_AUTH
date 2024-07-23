import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loading from './Loading';
import { useUpdateProfileMutation } from '../slice/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { setCredentials } from '../slice/authSlice';


const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile,{isLoading}] = useUpdateProfileMutation();

  useEffect(() =>{
    setName(userInfo?.name);
    setEmail(userInfo?.email);
    setPassword(userInfo?.password);
    setConfirmPassword(userInfo?.password);
  },[userInfo])
 
  const handleUpdate = async(e) =>{
    e.preventDefault();
    try {
      const updatedInfo = {
        _id:userInfo?._id,
        name,email,password
      }
      if(!updatedInfo){
        return toast.error("Missing update fields!");
      }
      if(confirmPassword !== password){
        return toast.error("Passwrods don't match!")
      }
      const res = await updateProfile(updatedInfo).unwrap();
      dispatch(setCredentials({...res}));
      toast.success("profile updated successfully!");
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err?.message || 'Error updating profile');
    }
  }
  if(isLoading){
    return <>
      <Loading/>
    </>
  }
  return (
    <FormContainer>
      <h1 className="text-3xl font-bold mb-6">Update Profile</h1>
      <form onSubmit={handleUpdate}>
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
          Update
        </button>
        {isLoading && <Loading />}
      </form>
    </FormContainer>
  );
};

export default Profile;
