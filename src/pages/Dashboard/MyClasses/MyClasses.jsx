import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { Plus, Eye, Pencil, Trash2, BookOpen, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import Loading from "../../../components/Loading";

const MyClasses = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [status, setStatus] = useState("approved");

    const { data, isLoading } = useQuery({
        queryKey: ["myClasses", user?.email, status],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-classes/${user.email}?status=${status}`);
            return res.data.result;
        },
    });

    const myClasses = data || [];

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete this class?",
            text: "This action will permanently remove this class from your classes.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DC2626",
            cancelButtonColor: "#64748B",
            confirmButtonText: "Delete Class"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/classes/${id}`);
                    toast.success("Class deleted successfully.");
                    queryClient.invalidateQueries({ queryKey: ["myClasses"] });
                } catch (error) {
                    toast.error("Failed to delete class.");
                }
            }
        });
    };

    if (isLoading) return <Loading />;

    const getStatusStyles = (status) => {
        switch (status) {
            case 'approved': return "bg-green-50 text-green-700 border-green-200";
            case 'pending': return "bg-amber-50 text-amber-700 border-amber-200";
            case 'rejected': return "bg-red-50 text-red-700 border-red-200";
            default: return "bg-slate-50 text-slate-700 border-slate-200";
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-widest mb-2">
                        TEACHING CONTENT
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-950">Your Classes</h2>
                    <p className="text-slate-600 mt-2">Manage your classes, monitor approval status, and keep your learning content organized.</p>
                </div>
                <Link to="/dashboard/add-class" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all whitespace-nowrap">
                    <Plus size={18} /> Add New Class
                </Link>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <select
                    className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                </select>
                <p className="text-sm text-slate-500 font-medium">{myClasses.length} Classes</p>
            </div>

            {/* Grid */}
            {myClasses.length === 0 ? (
                <div className="bg-white p-16 rounded-3xl text-center border border-slate-200 border-dashed">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-950 mb-2">Your classes will live here.</h3>
                    <p className="text-slate-600 mb-8 max-w-sm mx-auto">Create your first class and start sharing your knowledge with learners.</p>
                    <Link to="/dashboard/add-class" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">
                        Create Your First Class
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myClasses.map((cls) => (
                        <div key={cls._id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-200">
                            <div className="relative overflow-hidden aspect-video">
                                <img src={cls.image} alt={cls.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute top-3 right-3">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyles(cls.status)}`}>
                                        {cls.status === 'approved' && <CheckCircle size={12}/>}
                                        {cls.status === 'pending' && <AlertCircle size={12}/>}
                                        {cls.status === 'rejected' && <XCircle size={12}/>}
                                        {cls.status}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-slate-950 mb-1 line-clamp-1">{cls.title}</h3>
                                <p className="text-sm text-slate-500 mb-4">Created by {cls.name}</p>
                                
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-xl font-bold text-slate-950">${cls.price}</span>
                                    <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full">{cls.totalEnrollment || 0} learners</span>
                                </div>

                                <p className="text-slate-600 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">{cls.description}</p>
                                
                                <div className="grid grid-cols-3 gap-2 mt-auto pt-4 border-t border-slate-100">
                                    <Link to={`/dashboard/update-class/${cls._id}`} className="flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all" title="Update">
                                        <Pencil size={18} />
                                    </Link>
                                    <button onClick={() => handleDelete(cls._id)} className="flex items-center justify-center p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition-all" title="Delete">
                                        <Trash2 size={18} />
                                    </button>
                                    <Link to={`/dashboard/my-class/${cls._id}`} 
                                        className={`flex items-center justify-center p-2 rounded-xl transition-all ${cls.status === 'approved' ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50' : 'text-slate-300 cursor-not-allowed'}`}
                                        title={cls.status === 'approved' ? 'See Details' : 'Available after approval'}
                                    >
                                        <Eye size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyClasses;
