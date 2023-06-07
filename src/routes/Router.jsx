import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Error from "../pages/error/Error";
import Signin from "../pages/authentication/signin/Signin";
import Signup from "../pages/authentication/signin/Signup";

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
                element: <Home></Home>
            },
            {
                path: "signin",
                element: <Signin></Signin>
            },
            {
                path: "signup",
                element: <Signup></Signup>
            }
        ]
    },
]);

export default router