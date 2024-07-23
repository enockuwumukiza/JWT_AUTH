// src/App.js
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import HomeScreen from './screens/HomeScreen';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Profile from './components/Profile';
import Loading from './components/Loading';
import PrivateRoute from './components/PrivateRoute';
import Exit from './components/Exit';
const App = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path='/' element={<HomeScreen />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='' element={<PrivateRoute/>}>
            <Route path='/profile' element={<Profile/>}/>
          </Route>
        </Routes>
          <Exit/>
        <Toaster /> {/* Add Toaster here */}
      </Suspense>
    </>
  );
}

export default App;
