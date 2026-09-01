import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import useAxios from "../hook/useAxios";
import { ArrowLeft, User, Users, ChevronRight, BookOpen } from "lucide-react";

const ClassDetails = () => {
    const { id } = useParams();
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const { data: classInfo = {}, isLoading } = useQuery({
        queryKey: ["class-details", id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/all-classes/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    return (
        <section className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                    <span className="hover:text-slate-900 cursor-pointer" onClick={() => navigate('/')}>Home</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="hover:text-slate-900 cursor-pointer" onClick={() => navigate('/all-classes')}>Classes</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-950 font-medium">{classInfo.title}</span>
                </nav>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left: Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Hero */}
                        <div className="space-y-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
                                Web Development
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                                {classInfo.title}
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {classInfo.description}
                            </p>
                            <div className="flex items-center gap-6 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                                        <img src={classInfo.image} alt={classInfo.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-950">{classInfo.name}</p>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide">Instructor</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Overview */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-950 mb-6">About this class</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">{classInfo.description}</p>
                        </div>
                    </div>

                    {/* Right: Sticky Panel */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg sticky top-28 space-y-8">
                            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100">
                                <img src={classInfo.image} alt={classInfo.title} className="w-full h-full object-cover" />
                            </div>
                            
                            <div>
                                <p className="text-sm text-slate-500 mb-1">Course Price</p>
                                <p className="text-5xl font-extrabold text-slate-950">${classInfo.price}</p>
                                <p className="text-sm text-slate-400 mt-2">One-time enrollment</p>
                            </div>

                            <button
                                onClick={() => navigate(`/checkout/${classInfo._id}`)}
                                className="w-full btn-primary py-4 text-lg font-bold"
                            >
                                Enroll Now
                            </button>

                            <div className="space-y-4 pt-6 border-t border-slate-100">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Users className="w-5 h-5 text-blue-600" />
                                    <span className="font-semibold">{classInfo.totalEnrollment || 0} students enrolled</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                    <span className="font-semibold">Lifetime access</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClassDetails;
