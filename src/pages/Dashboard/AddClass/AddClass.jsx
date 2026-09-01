import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { Loader2, Plus, Image as ImageIcon, AlertCircle } from "lucide-react";
import Logo from "../../../components/Logo";

const AddClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  // Watch fields for preview
  const title = watch("title");
  const price = watch("price");
  const description = watch("description");
  const imageFile = watch("image");
  const previewImage = imageFile && imageFile[0] ? URL.createObjectURL(imageFile[0]) : null;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", data.image[0]);
      
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
        formData
      );

      const imageUrl = res.data.data.url;
      const classData = {
        title: data.title,
        name: user?.displayName,
        email: user?.email,
        price: parseFloat(data.price),
        description: data.description,
        image: imageUrl,
        status: "pending",
        totalEnrollment: 0,
        createdAt: new Date()
      };

      const classRes = await axiosSecure.post("/add-class", classData);

      if (classRes.data.data.insertedId) {
        toast.success("Class submitted for review!");
        reset();
        navigate("/dashboard/my-classes");
      }
    } catch (error) {
      toast.error("Failed to add class. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="space-y-2 mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest">
            CREATE A CLASS
        </span>
        <h1 className="text-3xl font-extrabold text-slate-950">Share what you know.</h1>
        <p className="text-slate-600">Create a clear, useful class that gives learners a strong reason to enroll.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Form */}
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Class title</label>
                        <input type="text" placeholder="e.g. Master React.js and Build Scalable Applications"
                            className={`w-full px-4 py-3.5 rounded-xl border ${errors.title ? 'border-red-500' : 'border-slate-200'} bg-white text-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-slate-400`}
                            {...register("title", { required: "Title is required" })} />
                        {errors.title && <p className="text-xs text-red-600 mt-2 font-medium">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Instructor Name</label>
                        <input type="text" value={user?.displayName || ""} readOnly
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 text-sm cursor-not-allowed" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Instructor Email</label>
                        <input type="email" value={user?.email || ""} readOnly
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 text-sm cursor-not-allowed" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Class price ($)</label>
                    <input type="number" placeholder="Enter price"
                        className={`w-full px-4 py-3.5 rounded-xl border ${errors.price ? 'border-red-500' : 'border-slate-200'} bg-white text-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-slate-400`}
                        {...register("price", { required: "Price is required" })} />
                    {errors.price && <p className="text-xs text-red-600 mt-2 font-medium">{errors.price.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Class description</label>
                    <textarea placeholder="Describe what students will learn and why this class is valuable."
                        className={`w-full px-4 py-3.5 rounded-xl border ${errors.description ? 'border-red-500' : 'border-slate-200'} bg-white text-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-slate-400 min-h-[160px] resize-y`}
                        {...register("description", { required: "Description is required" })} />
                    {errors.description && <p className="text-xs text-red-600 mt-2 font-medium">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Class image</label>
                    <input type="file" className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition-all cursor-pointer"
                        {...register("image", { required: "Image is required" })} />
                    {errors.image && <p className="text-xs text-red-600 mt-2 font-medium">{errors.image.message}</p>}
                </div>

                <button type="submit" disabled={loading}
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : <><Plus size={20} /> Add Class</>}
                </button>
            </form>
        </div>

        {/* Preview & Tips */}
        <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-28">
                <h3 className="font-bold text-slate-950 mb-4">Class Preview</h3>
                <div className="border border-slate-100 rounded-2xl overflow-hidden">
                    <div className="aspect-video bg-slate-100 relative">
                        {previewImage ? <img src={previewImage} className="w-full h-full object-cover" alt="Preview" /> : <div className="flex h-full items-center justify-center text-slate-400"><ImageIcon size={40} /></div>}
                        <span className="absolute top-3 left-3 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wider">PENDING</span>
                    </div>
                    <div className="p-4">
                        <p className="font-bold text-slate-950 text-lg truncate">{title || "Your class title"}</p>
                        <p className="text-sm text-slate-500 mb-3">By {user?.displayName}</p>
                        <p className="font-bold text-slate-950 text-xl">${price || "0"}</p>
                    </div>
                </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100">
                <h4 className="font-bold text-purple-950 mb-3">Make your class stand out</h4>
                <ul className="text-sm text-purple-800 space-y-2 list-disc list-inside">
                    <li>Use a descriptive, clear title.</li>
                    <li>Clearly explain the practical value.</li>
                    <li>Choose a professional-looking image.</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
