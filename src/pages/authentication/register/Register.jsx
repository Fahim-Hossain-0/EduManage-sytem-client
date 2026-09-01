import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import useAxios from "../../../hook/useAxios";
import useAuth from "../../../hook/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../socialLogin/SocialLogin";
import { Loader2, AlertCircle, Eye, EyeOff, ImageIcon } from "lucide-react";
import Logo from "../../../components/Logo";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosInstance = useAxios();
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const { register: reg, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setAuthError(null);
    if (!profilePic) return toast.error("Please upload a profile image");
    
    try {
      setLoading(true);
      await createUser(data.email, data.password);
      await updateUserProfile({ displayName: data.name, photoURL: profilePic });
      const userInfo = { name: data.name, email: data.email, role: "student", image: profilePic, createdAt: new Date() };
      await axiosInstance.post("/users", userInfo);
      toast.success("Account created successfully!");
      reset();
      setProfilePic("");
      navigate(from);
    } catch (error) {
      setAuthError(error?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    try {
      setImageLoading(true);
      const image = e.target.files[0];
      if (!image) return;
      const formData = new FormData();
      formData.append("image", image);
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`, formData);
      setProfilePic(res.data.data.url);
      toast.success("Image uploaded!");
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-[45%] flex-col bg-slate-50 p-12 relative overflow-hidden">
        <div className="relative z-10">
          <Logo />
          <div className="mt-20 space-y-6">
            <h1 className="text-4xl font-extrabold text-slate-950 leading-tight">
              Start learning <br />
              with purpose.
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed max-w-sm">
              Create your EduManage account and discover practical classes built to help you grow.
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 right-0 w-full h-1/2 opacity-20 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
            alt="Learning" 
            className="w-full h-full object-cover rounded-tl-full"
          />
        </div>
        <div className="absolute top-1/4 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 p-8 md:p-16 lg:p-20 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="lg:hidden mb-10">
            <Logo />
          </div>

          <div className="mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-4">
              GET STARTED
            </span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight mb-2">Create your EduManage account</h2>
            <p className="text-slate-500">Join a growing learning community and start building useful skills.</p>
          </div>

          {authError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-xl flex items-center gap-3 mb-6">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {authError}
              </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full name</label>
              <input type="text" placeholder="Enter your name"
                className={`w-full px-4 py-3.5 rounded-xl border ${errors.name ? 'border-red-500' : 'border-slate-200'} bg-white text-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-slate-400`}
                {...reg("name", { required: "Name is required" })} />
              {errors.name && <p className="text-xs text-red-600 mt-2 font-medium">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
              <input type="email" placeholder="Enter your email"
                className={`w-full px-4 py-3.5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-slate-200'} bg-white text-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-slate-400`}
                {...reg("email", { required: "Email is required" })} />
              {errors.email && <p className="text-xs text-red-600 mt-2 font-medium">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Create a password"
                  className={`w-full px-4 py-3.5 rounded-xl border ${errors.password ? 'border-red-500' : 'border-slate-200'} bg-white text-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-slate-400`}
                  {...reg("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-600 mt-2 font-medium">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Profile photo URL</label>
            <div className="flex items-center gap-4">
                  {profilePic ? (
                      <div className="relative">
                          <img src={profilePic} className="w-16 h-16 rounded-full object-cover border-2 border-blue-100 shadow-sm" alt="Profile" />
                          <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                      </div>
                  ) : (
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                          <ImageIcon className="w-8 h-8 text-slate-400" />
                      </div>
                  )}
                  <input type="file" className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition-all cursor-pointer"
                    onChange={handleImageUpload} />
              </div>
              {imageLoading && <div className="mt-2 flex items-center gap-2 text-xs text-slate-500"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading image...</div>}
            </div>

            <button type="submit" disabled={loading || imageLoading}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating account...</> : "Create Account"}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center"><span className="bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">OR</span></div>
          </div>

          <SocialLogin />

          <p className="text-center text-sm text-slate-500 mt-10">
            Already have an account?
            <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 ml-1.5 transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;