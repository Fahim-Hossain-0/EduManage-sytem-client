import axios from 'axios';
import React from 'react';


 const axiosSecure = axios.create({
    // baseURL:'http://localhost:5000',
    baseURL: "https://edu-manage-system-server.vercel.app"
 })
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;