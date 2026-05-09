import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layout/AuthLayout";
import login from "../pages/authentication/login/login";
import Register from "../pages/authentication/register/register";
import DashboardLayout from "../layout/DashboardLayout";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import PrivateRouter from "./PrivateRouter";



export const router = createBrowserRouter([
    {
        path: '/',
        Component:MainLayout,
        children:[
            {
                index:true,
              
                Component:Home
            }
        ]
    },
    {
        path:'/',
        Component:AuthLayout,
        children:[
            {
                path:'login',
                Component:login
            },
            {
                path:'register',
                Component:Register
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,
        children:[
            {
                path:'add-class',
                Component:AddClass
            }
        ]
    }
])