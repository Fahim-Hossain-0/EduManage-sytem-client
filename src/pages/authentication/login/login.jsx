import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useAuth from '../../../hook/useAuth';
import SocialLogin from '../socialLogin/SocialLogin';
import useAxios from '../../../hook/useAxios';
import { Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Logo from '../../../components/Logo';
import { useState } from 'react';

const Login = () => {
    const { login } = useAuth();
    const axiosInstance = useAxios();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        setAuthError(null);
        try {
            setLoading(true);
            await login(data.email, data.password);
            await axiosInstance.patch(`/users`, { email: data.email, last_log_in: new Date().toISOString() });
            toast.success('Welcome back! You\'re signed in.');
            navigate(from);
        } catch (error) {
            setAuthError('Unable to sign in. Please check your email and password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex lg:w-[45%] flex-col bg-slate-50 p-12 relative overflow-hidden">
                <div className="relative z-10">
                    <Logo />
                    <div className="mt-20 space-y-6">
                        <h1 className="text-4xl font-extrabold text-slate-950 leading-tight">
                            Learn skills. <br />
                            Build confidence. <br />
                            <span className="text-blue-600">Grow further.</span>
                        </h1>
                        <p className="text-slate-600 text-lg leading-relaxed max-w-sm">
                            EduManage connects learners with practical classes and passionate instructors.
                        </p>
                    </div>
                </div>
                
                <div className="absolute bottom-0 right-0 w-full h-1/2 opacity-20 pointer-events-none">
                    <img 
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop" 
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
                            WELCOME BACK
                        </span>
                        <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight mb-2">Welcome back to EduManage</h2>
                        <p className="text-slate-500">Continue learning and pick up where you left off.</p>
                    </div>

                    {authError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-xl flex items-center gap-3 mb-6">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            {authError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
                            <input 
                                type="email" 
                                placeholder="Enter your email"
                                className={`w-full px-4 py-3.5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-slate-200'} bg-white text-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-slate-400`}
                                {...register('email', { required: "Email is required" })} 
                            />
                            {errors.email && <p className="text-xs text-red-600 mt-2 font-medium">{errors.email.message}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block text-sm font-semibold text-slate-700">Password</label>
                            </div>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className={`w-full px-4 py-3.5 rounded-xl border ${errors.password ? 'border-red-500' : 'border-slate-200'} bg-white text-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-slate-400`}
                                    {...register('password', { 
                                        required: "Password is required", 
                                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                                    })} 
                                />
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

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Signing in...</> : "Sign In"}
                        </button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">OR</span>
                        </div>
                    </div>

                    <SocialLogin />

                    <p className="text-center text-sm text-slate-500 mt-10">
                        Don't have an account? 
                        <Link to="/register" className="text-blue-600 font-bold hover:text-blue-700 ml-1.5 transition-colors">Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;