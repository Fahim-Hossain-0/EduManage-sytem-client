import useAuth from "../../../hook/useAuth";
import { User, Mail, Phone, ShieldCheck, GraduationCap, Users, BookOpen, ClipboardList, AlertCircle } from "lucide-react";
import useUserRole from "../../../hook/useUserRole";

const Profile = () => {
  const { user } = useAuth();
  const [role] = useUserRole();

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="space-y-2">
        <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-widest mb-2">
          INSTRUCTOR PROFILE
        </span>
        <h2 className="text-3xl font-extrabold text-slate-950">Your teaching profile</h2>
        <p className="text-slate-600">Manage your account information and keep your instructor profile up to date.</p>
      </div>

      {/* Hero Card */}
      <div className="relative bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="px-8 pb-8 -mt-12 flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md" />
            ) : (
              <div className="w-28 h-28 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white text-slate-400 text-4xl font-bold">
                {user?.displayName?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="text-center md:text-left pt-12 md:pt-16 flex-1">
            <h1 className="text-3xl font-bold text-slate-950">{user?.displayName}</h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider">
                <GraduationCap size={14} /> {role || 'Teacher'}
            </div>
          </div>
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><Mail size={20} /></div>
              <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</p>
                  <p className="text-slate-950 font-semibold">{user?.email}</p>
              </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600"><ShieldCheck size={20} /></div>
              <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</p>
                  <p className="text-slate-950 font-semibold capitalize">{role}</p>
              </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600"><Phone size={20} /></div>
              <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</p>
                  <p className="text-slate-400 italic">Not provided</p>
              </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600"><User size={20} /></div>
              <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</p>
                  <p className="text-slate-950 font-semibold">{user?.displayName}</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Profile;
