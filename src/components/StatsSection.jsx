import { useQuery } from "@tanstack/react-query";
import useAxios from "../hook/useAxios";
import { Users, BookOpen, GraduationCap, TrendingUp } from "lucide-react";

const StatsSection = () => {
  const axiosInstance = useAxios();

  const { data: classData = {} } = useQuery({
    queryKey: ["classes-stats"],
    queryFn: async () => {
      const res = await axiosInstance.get("/all-classes?status=approved");
      return res.data;
    },
  });

  const { data: users = {} } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users-number");
      return res.data;
    },
  });

  const stats = [
    {
      label: "Global Learners",
      value: users?.allUserNumber || 0,
      icon: Users,
      color: "text-primary-600",
      bg: "bg-primary-50",
    },
    {
      label: "Expert Courses",
      value: classData?.totalClasses || 0,
      icon: BookOpen,
      color: "text-accent-600",
      bg: "bg-accent-50",
    },
    {
      label: "Total Enrollments",
      value: classData?.totalEnrollments || 0,
      icon: GraduationCap,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-zinc-50 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2">
            <div className="section-label">
              <TrendingUp className="w-3.5 h-3.5" />
              Our Performance
            </div>
            <h2 className="section-title">
              Empowering Education <span className="text-primary-600">At Scale</span>
            </h2>
            <p className="section-subtitle mb-8">
              We've built a platform that scales with your ambition. Whether you're a student seeking knowledge or an educator sharing it, our system handles it all with premium precision.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white border border-zinc-200">
                <p className="text-lg font-semibold text-zinc-900 mb-1">99.9% Uptime</p>
                <p className="text-sm text-zinc-500">Learning never stops with our reliable infrastructure.</p>
              </div>
              <div className="p-5 rounded-xl bg-white border border-zinc-200">
                <p className="text-lg font-semibold text-zinc-900 mb-1">24/7 Support</p>
                <p className="text-sm text-zinc-500">Our team is always here to help you succeed.</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 gap-4 w-full">
            {stats.map((stat, i) => (
              <div key={i} className="card-premium p-6 flex items-center gap-5">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-900 leading-none mb-0.5">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </div>
                  <p className="text-xs text-zinc-500 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
