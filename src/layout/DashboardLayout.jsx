import { Link, NavLink, Outlet } from "react-router-dom";
import Logo from "../pages/shared/logo/Logo";
import useAdmin from "../hook/useAdmin";
import useAuthContext from "../hook/useAuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const DashboardLayout = () => {

    // const isAdmin = false
    const isInsturctor = false
    const [isAdmin] = useAdmin()

    // Auth Context API
    const {logOut} = useAuthContext()

    // henslerLogout
    const henslerLogout =() => {

        logOut()
        .then(() => {
            toast.success('Successfully Logout', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        })
        .catch(e => {
            Swal.fire({
                icon: 'error',
                title: `<span >${e.code}</span>`,
            })
        })
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content px-32">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                {/* TODO: Logo */}
                {/* <div className="bg-transparent overflow-hidden">
                    <Logo></Logo>
                </div> */}
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-primary-clr text-white uppercase pt-16 text-xl">
                    {/* Sidebar content here */}
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to='/dashboard/users' className={({ isActive }) => isActive ? 'text-orange ' : ''}>Manage Users</NavLink></li>
                                {/* <li><NavLink to='/dashboard/enrolled-classes' className={({ isActive }) => isActive ? 'text-orange font-bold' : ''}>Enrolled Classes</NavLink></li> */}
                            </> :
                            isInsturctor ?
                                <>
                                    <li><NavLink to='/dashboard/add-class' className={({ isActive }) => isActive ? 'text-orange ' : ''}>Add a Class</NavLink></li>
                                    <li><NavLink to='/dashboard/my-classes' className={({ isActive }) => isActive ? 'text-orange ' : ''}>My Classes</NavLink></li>
                                </> :
                                <>
                                    <li><NavLink to='/dashboard/selected-classes' className={({ isActive }) => isActive ? 'text-orange ' : ''}>Selected Classes</NavLink></li>
                                    <li><NavLink to='/dashboard/enrolled-classes' className={({ isActive }) => isActive ? 'text-orange ' : ''}>Enrolled Classes</NavLink></li>
                                </>
                    }

                    <hr className="border-white my-5" />
                    <li> <Link to="/" >Home</Link></li>
                    <li> <Link to="/courses" >Courses</Link></li>
                    <li> <Link to="/instructors" >Instructors</Link></li>
                    <li onClick={henslerLogout}> <Link to="/signin">Sign out</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default DashboardLayout;