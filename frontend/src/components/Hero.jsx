// Hero.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Hero = () => {
  const userInfo = useSelector((state) =>state.auth.userInfo);

  return (
    <div className="py-12 bg-gray-100">
      <div className="flex justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">MERN Authentication</h1>
          <p className="text-lg mb-6 text-gray-600">
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and React.
          </p>
            {
              !userInfo &&

              (
                <div className="flex justify-center space-x-4">
            <Link to="/login">
              <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300">
                Register
              </button>
            </Link>
          </div>
              )
            }
        </div>
      </div>
    </div>
  );
};

export default Hero;
