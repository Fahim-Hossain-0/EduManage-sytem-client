import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-0 md:p-6 lg:p-8">
            <Outlet />
        </div>
    );
};

export default AuthLayout;
