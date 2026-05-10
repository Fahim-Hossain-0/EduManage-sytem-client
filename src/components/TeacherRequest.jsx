import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";
// import useAxiosSecure from "../hook/useAxiosSecure";


const TeacherRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

    const res = await axiosSecure.post(
        "/teacher-requests",
        teacherData
    );

    if (res.data.success) {
        toast.success(res.data.message);
    }

} catch (error) {

    toast.error(
        error.response?.data?.message ||
        error.message
    );
}};

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Apply For Teacher
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Name */}
          <div>
            <label className="font-semibold">Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="font-semibold">Experience</label>

            <select
              {...register("experience", {
                required: "Experience is required",
              })}
              className="select select-bordered w-full"
            >
              <option value="">Select Experience</option>
              <option value="beginner">Beginner</option>
              <option value="mid-level">Mid Level</option>
              <option value="experienced">Experienced</option>
            </select>

            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="font-semibold">Title</label>

            <input
              type="text"
              placeholder="Ex: MERN Stack Developer"
              {...register("title", {
                required: "Title is required",
              })}
              className="input input-bordered w-full"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="font-semibold">Category</label>

            <select
              {...register("category", {
                required: "Category is required",
              })}
              className="select select-bordered w-full"
            >
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Data Science">Data Science</option>
            </select>

            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <button className="btn btn-primary w-full">
            Submit For Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherRequest;