import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { Link } from "react-router";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { BookOpen, ArrowRight } from "lucide-react";

const MyEnrollClasses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: enrollments = [], isLoading } = useQuery({
    queryKey: ["my-enrollments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrollments/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-2">
              MY LEARNING
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950">Keep your learning moving.</h2>
          <p className="text-slate-600">Continue where you left off and stay connected to the classes you're taking.</p>
          <div className="pt-2 text-sm font-semibold text-slate-500">
              {enrollments.length} Enrolled Classes
          </div>
      </div>

      {enrollments.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl text-center border border-slate-200 border-dashed">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-950 mb-2">Your learning library is waiting for you.</h3>
          <p className="text-slate-600 mb-8 max-w-sm mx-auto">Explore classes, choose a skill, and start building something useful.</p>
          <Link to="/all-classes" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">
            Explore Classes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrollments.map((item) => (
            <div key={item._id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col group shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-200">
              <div className="relative overflow-hidden aspect-video">
                <img src={item.classImage} alt={item.classTitle} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-950 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{item.classTitle}</h3>
                <p className="text-sm text-slate-600 mb-6">By {item.teacherName}</p>
                
                <div className="mt-auto">
                  <Link
                    to={`/dashboard/my-enroll-class/${item.classId}`}
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all active:scale-[0.98]"
                  >
                    Continue Learning <ArrowRight size={16} />
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

export default MyEnrollClasses;
