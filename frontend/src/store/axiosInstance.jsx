import axios from 'axios'
import { config } from 'dotenv';
import { response } from 'express';
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL:'http://localhost:8000/api',
  timeout:10000,
  headers:{
    'Content-Type':'application/json'
  },
  withCredentials:true
});

axiosInstance.interceptors.request.use(
  (config) =>{
    return config;
  },
  (error) =>{
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>{
    if(error.response && error.response.status === 401){
      console.log("Authorization error - redirecting to login");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;