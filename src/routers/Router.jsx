import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layout/AuthLayout";
import login from "../pages/authentication/login/login";
import DashboardLayout from "../layout/DashboardLayout";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import PrivateRouter from "./PrivateRouter";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import PendingClasses from "../pages/Dashboard/PendingClasses/PendingClasses";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import TeacherRequest from "../components/TeacherRequest";
import TeacherRequests from "../pages/Dashboard/TeacherRequests/TeacherRequests";
import AllClasses from "../pages/AllClasses/AllClasses";
import ClassDetails from "../components/ClassDetails";
import Payment from "../pages/Payment/Payment";
import MyEnrollClasses from "../pages/Dashboard/MyEnrollClasses/MyEnrollClasses";
import TeacherRouter from "./TeacherRouter";
import Error from "../pages/Error/Error";
import AdminRoute from "./AdminRouter";
import MyEnrollClassDetails from "../pages/Dashboard/MyEnrollClassDetails/MyEnrollClassDetails";
import MyClassDetails from "../pages/Dashboard/MyClassDetails/MyClassDetails";
import AssignmentSubmissions from "../pages/Dashboard/AssignmentSubmissions/AssignmentSubmissions";
import UpdateClass from "../pages/Dashboard/MyClasses/UpdateClass";
import Register from "../pages/authentication/register/register";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,

        Component: Home,
      },
      {
        path: "teacher-request",
        // Component: TeacherRequest,
        element: (
          <PrivateRouter>
            <TeacherRequest />
          </PrivateRouter>
        ),
      },
      {
        path: "all-classes",
        Component: AllClasses,
      },
      {
        path: "classDetails/:id",
        // Component:ClassDetails
        element: (
          <PrivateRouter>
            <ClassDetails />
          </PrivateRouter>
        ),
      },
      {
        path: "checkout/:id",
        // Component:Payment
        element: (
          <PrivateRouter>
            <Payment />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout></DashboardLayout>
      </PrivateRouter>
    ),
    children: [
      {
        path: "add-class",
        // Component: AddClass,
        element: (
          <TeacherRouter>
            <AddClass />
          </TeacherRouter>
        ),
      },
      {
        path: "my-classes",
        // Component: MyClasses,
        element: (
          <TeacherRouter>
            <MyClasses />
          </TeacherRouter>
        ),
      },
      {
        path: "pending-classes",
        // Component: PendingClasses,
        element: (
         <AdminRoute> 
            <PendingClasses />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        // Component: ManageUsers,
        element:<AdminRoute><ManageUsers /></AdminRoute>
      },
      {
        path: "teacher-requests",
        element: <AdminRoute><TeacherRequests /></AdminRoute>
      },
      {
        path: "my-enroll-classes",
        // Component: MyEnrollClasses,
        element: <PrivateRouter><MyEnrollClasses /></PrivateRouter>
      },
      {
  path:"my-enroll-class/:id",
  element:
  <PrivateRouter>
    <MyEnrollClassDetails/>
  </PrivateRouter>
},
{
  path:
     "assignment-submissions/:id",
  element: (
    <TeacherRouter>
      <AssignmentSubmissions />
    </TeacherRouter>
  ),
},
{
  path: "update-class/:id",
  element: (
    <TeacherRouter>
      <UpdateClass />
    </TeacherRouter>
  )
},
{
  path: "my-class/:id",
  element: (
    <TeacherRouter>
      <MyClassDetails />
    </TeacherRouter>
  ),
},

    ],
  },
  {
    path: "/error",
    Component: Error,
  },
]);
