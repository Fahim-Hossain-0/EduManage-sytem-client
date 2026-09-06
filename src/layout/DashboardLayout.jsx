import { Link, NavLink, Outlet } from "react-router";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Menu,
  LogOut,
  Home,
  GraduationCap,
  UserPlus,
  ClipboardCheck,
  User,
  ChevronDown,
  X,
} from "lucide-react";
import useAuth from "../hook/useAuth";
import useUserRole from "../hook/useUserRole";
import Loading from "../components/Loading";
import { useState } from "react";
import Logo from "../components/Logo";

const DashboardLayout = () => {
  const { user, logOut, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (loading || roleLoading) {
    return <Loading />;
  }

  const activeLink = "bg-blue-50 text-blue-600";
  const inactiveLink = "text-slate-600 hover:bg-slate-100 hover:text-slate-900";

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 bg-white border-r border-slate-200 z-50">
        <div className="p-6 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-lg text-slate-950">EduManage</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Menu</p>
          <NavLink to="/dashboard" end className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive ? activeLink : inactiveLink}`}>
            <LayoutDashboard size={20} /> Overview
          </NavLink>

          {!roleLoading && role === "admin" && (
            <>
              <NavLink to="/dashboard/manage-users" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive ? activeLink : inactiveLink}`}>
                <Users size={20} /> Manage Users
              </NavLink>
              <NavLink to="/dashboard/teacher-requests" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive ? activeLink : inactiveLink}`}>
                <UserPlus size={20} /> Teacher Requests
              </NavLink>
              <NavLink to="/dashboard/pending-classes" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive ? activeLink : inactiveLink}`}>
                <ClipboardCheck size={20} /> Pending Classes
              </NavLink>
            </>
          )}

          {!roleLoading && role === "teacher" && (
            <>
              <NavLink to="/dashboard/my-classes" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive ? activeLink : inactiveLink}`}>
                <BookOpen size={20} /> My Classes
              </NavLink>
              <NavLink to="/dashboard/add-class" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive ? activeLink : inactiveLink}`}>
                <GraduationCap size={20} /> Add Class
              </NavLink>
            </>
          )}

          <NavLink to="/dashboard/my-enroll-classes" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive ? activeLink : inactiveLink}`}>
            <BookOpen size={20} /> My Enrollments
          </NavLink>
          <NavLink to="/dashboard/profile" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive ? 'bg-purple-50 text-purple-700' : inactiveLink}`}>
            <User size={20} /> Profile
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-1">
          <NavLink to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100">
            <Home size={20} /> Back to Home
          </NavLink>
          <div className="flex items-center gap-3 px-4 py-3">
              {user?.photoURL ? (
                <img className="h-10 w-10 rounded-full object-cover" src={user.photoURL} alt={user.displayName} />
              ) : (
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">{user?.displayName?.charAt(0).toUpperCase()}</div>
              )}
              <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold text-slate-950 truncate">{user?.displayName}</p>
                  <p className="text-xs text-slate-500 capitalize">{role}</p>
              </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-bold text-slate-950">
                {role === 'teacher' ? 'Teacher Dashboard' : 'Dashboard'}
            </h2>
            <button onClick={logOut} className="flex items-center gap-2 text-sm text-red-600 font-semibold hover:text-red-700">
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </header>

        <main className="p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
