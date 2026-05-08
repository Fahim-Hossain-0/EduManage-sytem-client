import React from 'react';
import useAuth from '../hook/useAuth';
import Loading from '../components/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRouter = ({ children }) => {
    const {user,loading} = useAuth()
    const location = useLocation();

    if(loading){
        return <Loading></Loading>
    }
    
    if(!user){
        return <Navigate state={{from: location.pathname}} to="/login"></Navigate>
    }
    return children;
};

export default PrivateRouter;