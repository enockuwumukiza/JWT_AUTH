import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl mb-4">Loading....</h1>
      <h3 className="text-xl mb-8">Please wait!</h3>
      <div className="flex space-x-4">
        <span className="loading loading-infinity loading-lg" style={{ width: '80px', height: '80px' }}></span>
        <span className="loading loading-infinity loading-lg" style={{ width: '80px', height: '80px' }}></span>
        <span className="loading loading-infinity loading-lg" style={{ width: '80px', height: '80px' }}></span>
      </div>
    </div>
  );
};

export default Loading;
