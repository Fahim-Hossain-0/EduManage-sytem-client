import axios from "axios";
// import { useEffect } from "react";
// import useAuth from "./useAuth";

const axiosSecure = axios.create({
//   baseURL: "http://localhost:5000",
    baseURL: import.meta.env.VITE_API_URL
});

const useAxiosSecure = () => {
  // const { user } = useAuth();

  // useEffect(() => {
  //   const interceptor = axiosSecure.interceptors.request.use(
  //     async (config) => {
  //       if (user) {
  //         const token = await user.getIdToken();

  //         config.headers.Authorization = `Bearer ${token}`;
  //       }

  //       return config;
  //     }
  //   );

  //   return () => {
  //     axiosSecure.interceptors.request.eject(interceptor);
  //   };
  // }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;