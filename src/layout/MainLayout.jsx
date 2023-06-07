import { Outlet } from "react-router-dom";
import Header from "../pages/shared/header/Header";
import Footer from "../pages/shared/footer/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const MainLayout = () => {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
            <ToastContainer />
        </>
    );
};

export default MainLayout;