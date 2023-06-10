import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthContext from "../../../hook/useAuthContext";
import Logo from "../logo/Logo";
import Swal from "sweetalert2";

const header = () => {

    // Context API
    const { user, logOut } = useAuthContext()

    //  handler Logout 
    const handlerLogout = () => {
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

    // Navigation Option
    const navOption = <>
        <li> <NavLink className={({ isActive }) => isActive ? 'text-blue font-bold' : ''} to="/" >Home</NavLink></li>
        <li> <NavLink className={({ isActive }) => isActive ? 'text-blue font-bold' : ''} to="/courses" >Courses</NavLink></li>
        <li> <NavLink className={({ isActive }) => isActive ? 'text-blue font-bold' : ''} to="/instructors" >Instructors</NavLink></li>
        {
            user ? <>
                <li>
                    <button >
                        <Link to="/dashboard">DASHBOARD</Link>
                    </button>
                </li>
                <li>
                    <button onClick={handlerLogout}>
                        <Link to="/">SIGNOUT</Link>
                    </button>
                </li>
                <img className="rounded-full" src={user?.photoURL} alt="DP" style={{ height: '30px', width: '30px' }} />
            </>
                :
                <li> <Link to="/signin">Signin</Link></li>
        }
    </>

    return (
        <nav className="navbar bg-primary-clr text-white fixed z-10 px-10 border-b-2">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden -ml-10 mr-0 pr-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content -ml-8 mt-3 p-2 shadow bg-primary-clr  w-80 uppercase">
                        {navOption}
                    </ul>
                </div>

                {/* Logo */}
                <div className="flex flex-wrap">
                    <Logo></Logo>
                </div>
            </div>

            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 uppercase items-center">
                    {navOption}
                </ul>
            </div>
        </nav>
    );
};

export default header;