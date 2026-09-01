import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";
import { GraduationCap } from "lucide-react";

const TeacherRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const teacherData = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      experience: data.experience,
      title: data.title,
      category: data.category,
      status: "pending",
      role: "student",
      created_at: new Date(),
    };

    try {
      const res = await axiosSecure.post("/teacher-requests", teacherData);
      if (res.data.success) { toast.success(res.data.message); reset(); }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <section className="py-10 md:py-16 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="card-premium p-6 md:p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900">Apply For Teacher</h2>
          <p className="text-sm text-zinc-500 mt-1">Share your knowledge with the world</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Name</label>
            <input type="text" value={user?.displayName || ""} readOnly className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 text-sm text-zinc-500 cursor-not-allowed" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email</label>
            <input type="email" value={user?.email || ""} readOnly className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 text-sm text-zinc-500 cursor-not-allowed" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Experience</label>
            <select {...register("experience", { required: "Experience is required" })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all">
              <option value="">Select Experience</option>
              <option value="beginner">Beginner</option>
              <option value="mid-level">Mid Level</option>
              <option value="experienced">Experienced</option>
            </select>
            {errors.experience && <p className="text-xs text-red-500 mt-1">{errors.experience.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Title</label>
            <input type="text" placeholder="Ex: MERN Stack Developer"
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              {...register("title", { required: "Title is required" })} />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Category</label>
            <select {...register("category", { required: "Category is required" })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all">
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Data Science">Data Science</option>
            </select>
            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
          </div>

          <button type="submit" className="btn-primary w-full text-sm py-2.5">Submit For Review</button>
        </form>
      </div>
    </section>
  );
};

export default TeacherRequest;
