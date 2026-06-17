import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email && !!user?.accessToken,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);

      return res.data.role;
    },
  });

//   console.log({
//     user: user?.email,
//     loading,
//     roleLoading,
//     role,
//   });
//   console.log(role);

  return {
    role,
    roleLoading,
  };
};

export default useUserRole;
