import React from 'react';

const FormContainer = ({ children }) => {
  return (
    <div className="container mx-auto mt-12">
      <div className="flex justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
