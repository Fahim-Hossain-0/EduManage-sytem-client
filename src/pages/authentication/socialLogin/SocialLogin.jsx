import { useState } from "react";
import useAuth from "../../../hook/useAuth";
import useAxios from "../../../hook/useAxios";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
        role: "student",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };
      await axiosInstance.post("/users", userInfo);
      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Google Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <><Loader2 className="w-5 h-5 animate-spin" /> Connecting...</>
      ) : (
        <>
          <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g>
          </svg>
          Continue with Google
        </>
      )}
    </button>
  );
};

export default SocialLogin;
