import React from "react";
import useAuth from "../hook/useAuth";
import useUserRole from "../hook/useUserRole";
import Loading from "../components/Loading";
import { Navigate, useLocation } from "react-router";

const TeacherRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (!user || role !== "teacher") {
    return (
      <Navigate state={{ from: location.pathname }} to="/error"></Navigate>
    );
  }

  return children;
};

export default TeacherRouter;
