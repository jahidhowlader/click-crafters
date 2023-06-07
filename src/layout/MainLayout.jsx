import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/header/Navbar";

const MainLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </>
    );
};

export default MainLayout;