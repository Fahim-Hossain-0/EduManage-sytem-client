import useAuth from "../../../hook/useAuth";
import { User, Mail, Phone, ShieldCheck } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-2">
              MY PROFILE
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950">Your profile</h2>
          <p className="text-slate-600">Manage and view your EduManage account information.</p>
      </div>

      {/* Hero Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} className="w-24 h-24 rounded-full object-cover border-4 border-blue-50 shadow-sm" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-blue-50 text-blue-600 text-3xl font-bold">
              {user?.displayName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl font-bold text-slate-950">{user?.displayName}</h1>
            <p className="text-slate-500 mt-1 capitalize">{user?.email}</p>
        </div>
        <div className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck size={14} /> Student
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</p>
              <p className="text-slate-950 font-semibold">{user?.displayName}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</p>
              <p className="text-slate-950 font-semibold">{user?.email}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</p>
              <p className="text-slate-950 font-semibold capitalize">Student</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</p>
              <p className="text-slate-400 italic">Not provided</p>
          </div>
      </div>
    </div>
  );
};

export default Profile;