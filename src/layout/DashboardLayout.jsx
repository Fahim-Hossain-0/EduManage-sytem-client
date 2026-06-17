// src/layouts/DashboardLayout.jsx

import { Link, NavLink, Outlet } from "react-router";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  Menu,
  LogOut,
  Home,
} from "lucide-react";
import useAuth from "../hook/useAuth";
import useUserRole from "../hook/useUserRole";
import Loading from "../components/Loading";

const DashboardLayout = () => {
  const { user, logOut, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <Loading />;
  }

//   if (
//   loading ||
//   roleLoading ||
//   (user && !role)
// ) {
//   return <Loading />;
// }

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      {/* Drawer Toggle */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col bg-base-200">
        {/* Top Navbar */}
        <div className="navbar bg-base-100 shadow-sm px-4 sticky top-0 z-10">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <Menu size={22} />
            </label>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">Dashboard</h2>
          </div>

          <div className="flex-none">
            {user && (
              <button
                onClick={logOut}
                className="btn btn-error btn-sm text-black"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <aside className="w-72 min-h-full bg-base-100 border-r border-base-300">
          {/* Logo */}
          <div className="p-6 border-b border-base-300">
            <Link to="/">
              <h1 className="text-3xl font-bold text-primary">EduManage</h1>
              <p className="text-sm opacity-70">
                <span>{role} Dashboard</span>
              </p>
            </Link>
          </div>

          {/* Menu */}
          <ul className="menu p-4 space-y-2 text-base-content">
            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  isActive ? "active font-semibold" : ""
                }
              >
                <LayoutDashboard size={18} />
                Overview
              </NavLink>
            </li>

            {!roleLoading && role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) =>
                      isActive ? "active font-semibold" : ""
                    }
                  >
                    <Users size={18} />
                    Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/teacher-requests">
                    Teacher Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/pending-classes"
                    className={({ isActive }) =>
                      isActive ? "active font-semibold" : ""
                    }
                  >
                    <Settings size={18} />
                    Pending Classes
                  </NavLink>
                </li>
              </>
            )}

            {!roleLoading && role === "teacher" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/my-classes"
                    className={({ isActive }) =>
                      isActive ? "active font-semibold" : ""
                    }
                  >
                    <BookOpen size={18} />
                    My Classes
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/add-class"
                    className={({ isActive }) =>
                      isActive ? "active font-semibold" : ""
                    }
                  >
                    <Settings size={18} />
                    Add Class
                  </NavLink>
                </li>
              </>
            )}

            <li>
              <NavLink to="/dashboard/my-enroll-classes">
                <BookOpen size={18} />
                My Enrolled Classes
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active font-semibold" : ""
                }
              >
                <Home size={18} />
                Home
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
