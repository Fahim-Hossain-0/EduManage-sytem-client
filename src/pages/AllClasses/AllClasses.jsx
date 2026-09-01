import { useQuery } from "@tanstack/react-query";
import ClassCard from "../../components/ClassCard";
import Loading from "../../components/Loading";
import useAxios from "../../hook/useAxios";
import { BookOpen, Search } from "lucide-react";

const AllClasses = () => {
    const axiosInstance = useAxios();
    const { data: classes = [], isLoading } = useQuery({
       queryKey: ["approved-classes"],
        queryFn: async () => {
            const res = await axiosInstance.get("/all-classes");
            return res.data.result;
        },
    });

    if (isLoading) return <Loading />;

    return (
        <section className="min-h-screen bg-slate-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
                        EXPLORE • LEARN • GROW
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-4 tracking-tight">
                        Find the right skills for your next step.
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Explore practical classes created by instructors who want to help you build useful skills and real-world confidence.
                    </p>
                </div>

                {/* Toolbar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="text" placeholder="Search classes..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                    </div>
                    <div className="text-sm text-slate-500 font-medium">
                        Showing {classes.length} learning opportunities
                    </div>
                </div>

                {/* Grid */}
                {classes.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl text-center border border-slate-200">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-950 mb-2">No classes found</h3>
                        <p className="text-slate-600">Try another search or explore a different category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {classes.map((item) => (
                            <ClassCard key={item._id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllClasses;
