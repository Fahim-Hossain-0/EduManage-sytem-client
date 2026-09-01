import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hook/useAxios";
import useAuth from "../../hook/useAuth";
import { BookOpen, Users, ClipboardCheck, ArrowRight, LayoutDashboard } from "lucide-react";
import { Link } from "react-router";
import Loading from "../../components/Loading";

const StudentDashboardOverview = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    // Fetch enrolled classes to get count and list
    const { data: enrolledClasses = [], isLoading } = useQuery({
        queryKey: ["enrolled-classes", user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/enrolled-classes/${user?.email}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    const totalEnrolled = enrolledClasses.length;

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h1 className="text-3xl font-extrabold text-slate-950 mb-2">Welcome back, {user?.displayName?.split(' ')[0]}!</h1>
                <p className="text-slate-600">Keep learning, complete your assignments, and move closer to your goals.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                            <BookOpen size={24} />
                        </div>
                        <h3 className="font-semibold text-slate-600">Enrolled Classes</h3>
                    </div>
                    <p className="text-4xl font-extrabold text-slate-950">{totalEnrolled}</p>
                    <p className="text-sm text-slate-400 mt-1">Classes you're learning</p>
                </div>
                {/* Placeholder for other stats */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center text-slate-400 hover:border-blue-200 transition-colors">
                    <p className="font-semibold text-slate-900">More insights soon</p>
                    <p className="text-xs">Dashboard updates</p>
                </div>
            </div>

            {/* Continue Learning */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950">Continue Learning</h2>
                {totalEnrolled > 0 ? (
                    <div className="grid lg:grid-cols-2 gap-6">
                        {enrolledClasses.slice(0, 2).map((cls) => (
                            <div key={cls._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-6 hover:shadow-md transition-shadow">
                                <img src={cls.image} alt={cls.title} className="w-32 h-32 rounded-xl object-cover" />
                                <div className="flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-bold text-lg text-slate-950">{cls.title}</h4>
                                        <p className="text-sm text-slate-600">with {cls.teacherName}</p>
                                    </div>
                                    <Link to={`/dashboard/my-enroll-class/${cls.classId}`} className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:text-blue-700">
                                        Continue Learning <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-12 rounded-2xl text-center border border-slate-200 border-dashed">
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-950 mb-2">Your learning journey starts here.</h3>
                        <p className="text-slate-600 mb-6">Explore classes and find something worth learning today.</p>
                        <Link to="/all-classes" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700">Explore Classes</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboardOverview;