// src/components/StatsSection.jsx

import { useQuery } from "@tanstack/react-query";
import useAxios from "../hook/useAxios";



const StatsSection = () => {

    const axiosInstance = useAxios();

    // classes stats
    const { data: classData = {} } = useQuery({
        queryKey: ["classes-stats"],
        queryFn: async () => {

            const res = await axiosInstance.get(
                "/all-classes?status=approved"
            );

            return res.data;
        },
    });

    // users stats
    const { data: users = {} } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {

            const res = await axiosInstance.get(
                "/all-users"
            );

            return res.data;
        },
    });

    return (

        <section className="py-20 bg-base-100">

            <div className="max-w-6xl mx-auto px-4">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT SIDE */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                        {/* Users */}
                        <div className="bg-base-200 rounded-2xl p-6 text-center shadow">

                            <h2 className="text-3xl font-bold text-primary">
                                {users?.allUserNumber || 0}
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Total Users
                            </p>

                        </div>

                        {/* Classes */}
                        <div className="bg-base-200 rounded-2xl p-6 text-center shadow">

                            <h2 className="text-3xl font-bold text-secondary">
                                {classData?.totalClasses || 0}
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Total Classes
                            </p>

                        </div>

                        {/* Enrollment */}
                        <div className="bg-base-200 rounded-2xl p-6 text-center shadow">

                            <h2 className="text-3xl font-bold text-accent">
                                {classData?.totalEnrollments || 0}
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Total Enrollments
                            </p>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
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