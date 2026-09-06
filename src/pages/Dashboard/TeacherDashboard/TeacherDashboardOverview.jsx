import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { BookOpen, Users, ClipboardCheck, ArrowRight, GraduationCap, LayoutDashboard, Plus } from "lucide-react";
import { Link } from "react-router";
import Loading from "../../../components/Loading";

const TeacherDashboardOverview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch teacher's classes
    const { data, isLoading } = useQuery({
        queryKey: ["my-classes-stats", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            // Fetch all classes for the teacher to calculate stats
            const res = await axiosSecure.get(`/my-classes/${user.email}?limit=100`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    const myClasses = data?.result || [];
    const totalClasses = myClasses.length;
    const totalEnrollment = myClasses.reduce((acc, cls) => acc + (cls.totalEnrollment || 0), 0);
    const pendingClasses = myClasses.filter(cls => cls.status === 'pending').length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-2">TEACHER WORKSPACE</span>
                        <h1 className="text-3xl font-extrabold text-slate-950 mb-2">Manage your classes. Inspire your learners.</h1>
                        <p className="text-slate-600">Keep track of your classes, learners, and assignments from one place.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/dashboard/add-class" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-sm shadow-blue-600/20">
                            <Plus size={18} /> Add New Class
                        </Link>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { label: "My Classes", value: totalClasses, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Total Learners", value: totalEnrollment, icon: Users, color: "text-cyan-600", bg: "bg-cyan-50" },
                    { label: "Pending Classes", value: pendingClasses, icon: ClipboardCheck, color: "text-amber-600", bg: "bg-amber-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <h3 className="font-semibold text-slate-600">{stat.label}</h3>
                        </div>
                        <p className="text-4xl font-extrabold text-slate-950">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Classes */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950">Your Classes</h2>
                {myClasses.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myClasses.slice(0, 3).map((cls) => (
                            <div key={cls._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <img src={cls.image} alt={cls.title} className="w-full h-40 rounded-xl object-cover mb-4" />
                                <h4 className="font-bold text-lg text-slate-950 mb-1">{cls.title}</h4>
                                <p className="text-sm text-slate-500 mb-4">{cls.totalEnrollment || 0} students enrolled</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cls.status === 'approved' ? 'bg-green-50 text-green-700' : cls.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
                                        {cls.status}
                                    </span>
                                    <Link to={`/dashboard/my-class/${cls._id}`} className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:text-blue-700">
                                        View <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-12 rounded-2xl text-center border border-slate-200 border-dashed">
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
                            <GraduationCap className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-950 mb-2">Your teaching journey starts here.</h3>
                        <p className="text-slate-600 mb-6">Create your first class and share your knowledge with learners.</p>
                        <Link to="/dashboard/add-class" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">
                            Create Your First Class
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherDashboardOverview;