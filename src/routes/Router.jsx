import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Error from "../pages/error/Error";
import Signin from "../pages/authentication/signin/Signin";
import Signup from "../pages/authentication/signup/Signup";
import Instructors from "../pages/instructors/Instructors";
import Courses from "../pages/courses/Courses";
import DashboardLayout from "../layout/DashboardLayout";
import SelectedClass from "../pages/dashboard/selectedClass/SelectedClass";
import EnrolledClasses from "../pages/dashboard/enrolledClasses/EnrolledClasses";
import PrivateRoutes from "./PrivateRoutes";
import Users from "../pages/dashboard/users/Users";
import ManageClasses from "../pages/dashboard/manageClasses/ManageClasses";
import AdminRoutes from "./AdminRoutes";
import MyClasses from "../pages/dashboard/instructorPage/myClasses/MyClasses";
import AddClass from "../pages/dashboard/instructorPage/addClass/AddClass";
import InstructorRoutes from "./InstructorRoutes";

const router = createBrowserRouter([
    {
        path: "*",
        element: <Error></Error>
    },
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader: () => fetch('/public/fakeData.json')
            },
            {
                path: "signin",
                element: <Signin></Signin>
            },
            {
                path: "signup",
                element: <Signup></Signup>
            },
            {
                path: "courses",
                element: <Courses></Courses>,
                loader: () => fetch('http://localhost:5000/courses')
            },
            {
                path: "instructors",
                element: <Instructors></Instructors>,
                loader: () => fetch('/public/fakeData.json')
            },  
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
            {
                path: 'users',
                element: <AdminRoutes><Users></Users></AdminRoutes>
            },
            {
                path: 'manage-classes',
                element: <AdminRoutes><ManageClasses></ManageClasses></AdminRoutes>
            },
            {
                path: 'my-classes',
                element: <InstructorRoutes><MyClasses></MyClasses></InstructorRoutes>
            },
            {
                path: 'add-class',
                element: <InstructorRoutes><AddClass></AddClass></InstructorRoutes>
            },
            {
                path: 'selected-classes',
                element: <SelectedClass></SelectedClass>
            },
            {
                path: 'enrolled-classes',
                element: <EnrolledClasses></EnrolledClasses>
            }
        ]
    }
]);

export default router