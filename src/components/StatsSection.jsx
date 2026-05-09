// src/components/StatsSection.jsx

import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../hook/useAxiosSecure";
import { useState } from "react";

const StatsSection = () => {
  const axiosSecure = useAxiosSecure()
  

 const { data:classes} = useQuery({
    queryKey: ['classes',],
    queryFn: async () => {

        const res = await axiosSecure.get(
            `/all-classes`
        );
        
        return res.data;
    }
});
 const { data:users} = useQuery({
    queryKey: ['users',],
    queryFn: async () => {

        const res = await axiosSecure.get(
            `/all-users`
        );
       
        return res.data;
    }
});

// const classes = data?.classes || [];

// const totalClasses = data?.totalClasses || 0;



  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-6xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE - CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            {/* Total Users */}
            <div className="bg-base-200 rounded-2xl p-6 text-center shadow">
              <h2 className="text-3xl font-bold text-primary">
                {users?.allUserNumber}
              </h2>
              <p className="text-gray-500 mt-2">Total Users</p>
            </div>

            {/* Total Classes */}
            <div className="bg-base-200 rounded-2xl p-6 text-center shadow">
              <h2 className="text-3xl font-bold text-secondary">
                {classes?.totalClasses}
              </h2>
              <p className="text-gray-500 mt-2">Total Classes</p>
            </div>

            {/* Total Enrollment */}
            <div className="bg-base-200 rounded-2xl p-6 text-center shadow">
              <h2 className="text-3xl font-bold text-accent">
                {classes?.totalEnrollments}
              </h2>
              <p className="text-gray-500 mt-2">Total Enrollments</p>
            </div>

          </div>

          {/* RIGHT SIDE - IMAGE */}
          <div className="flex justify-center">
            <img
              src="https://i.ibb.co/3W3kG3v/online-learning.png"
              alt="learning"
              className="w-full max-w-md"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default StatsSection;