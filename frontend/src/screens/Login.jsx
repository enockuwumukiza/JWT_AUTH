import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useLoginMutation } from '../slice/usersApiSlice';
import { setCredentials } from '../slice/authSlice';
import Loading from '../components/Loading';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, isError, isSuccess, error }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate('/');
      toast.success('Login successful!');
    } catch (err) {
      // Handle the error and display the toast
      toast.error(err?.data?.message || err?.message || 'Login failed');
    }
  };

  if (isLoading) {
    return <Loading />;
  }


  return (
    <header className="bg-blue-900 text-white py-6">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back!</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Log In
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-700">New Customer?</span>
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-800 font-semibold ml-2 transition duration-300"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Login;
