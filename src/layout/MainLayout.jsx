import { Outlet } from "react-router-dom";
import Header from "../pages/shared/header/Header";
import Footer from "../pages/shared/header/footer/Footer";

const MainLayout = () => {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default MainLayout;