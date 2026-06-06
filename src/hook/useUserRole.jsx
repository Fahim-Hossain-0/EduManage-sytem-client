import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = () => {
 const {user,loading} = useAuth()
 const axiosSecure = useAxiosSecure()
 const {data:role = "student",isLoading:roleLoading,refetch}= useQuery({
    queryKey:['userRole',user?.email],
    enabled:!loading && !!user?.email,
    queryFn:async()=>{
        const response = await axiosSecure.get(`/users/role/${user?.email}`);
        return response.data.role;
    }
 })

//  console.log(role);
    return{role,roleLoading,refetch}
};

export default useUserRole;