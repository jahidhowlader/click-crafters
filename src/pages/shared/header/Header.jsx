import { Link } from "react-router-dom";

const header = () => {

    const logo = 'ClickCrafters'

    const navOption = <>
        <li> <Link>Home</Link></li>
        <li> <Link>Courses</Link></li>
        <li> <Link>Instructors</Link></li>
        <li> <Link to="/signin">Signin</Link></li>
    </>
    return (
        <nav className="navbar bg-black text-white fixed z-10 px-10 border-b-2">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-black  w-52 uppercase">
                        {navOption}
                    </ul>
                </div>

                {/* Logo */}
                <Link to="/" className="btn btn-ghost uppercase">{logo.split('').map((word, idx) => <span key={idx} className="bg-white text-black w-4 h-4">{word}</span>)}</Link>
            </div>

            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 uppercase">
                    {navOption}
                </ul>
            </div>
        </nav>
    );
};

export default header;