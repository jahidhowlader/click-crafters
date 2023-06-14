import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Error from "../pages/error/Error";
import Signin from "../pages/authentication/signin/Signin";
import Signup from "../pages/authentication/signup/Signup";
import Instructors from "../pages/instructors/InstructorsPage";
import Courses from "../pages/courses/Courses";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import MyClasses from "../pages/dashboard/instructorPage/myClasses/MyClasses";
import AddClass from "../pages/dashboard/instructorPage/addClass/AddClass";
import InstructorRoutes from "./InstructorRoutes";
import SelectedClass from "../pages/dashboard/userPage/selectedClass/SelectedClass";
import EnrolledClasses from "../pages/dashboard/userPage/enrolledClasses/EnrolledClasses";
import Users from "../pages/dashboard/adminPage/users/Users";
import Payment from "../pages/dashboard/userPage/selectedClass/Payment";
import ManageCourses from "../pages/dashboard/adminPage/manageClasses/ManageCourses";

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
                loader: () => fetch('http://localhost:5000/courses')
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
                loader: () => fetch('http://localhost:5000/instructor')
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
            {
                path: 'selected-classes',
                element: <SelectedClass></SelectedClass>
            },
            {
                path: 'enrolled-classes',
                element: <EnrolledClasses></EnrolledClasses>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
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
                path: 'users',
                element: <AdminRoutes><Users></Users></AdminRoutes>
            },
            {
                path: 'manage-classes',
                element: <AdminRoutes><ManageCourses></ManageCourses></AdminRoutes>
            }
        ]
    }
]);

export default router