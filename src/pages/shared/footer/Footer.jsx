import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../logo/Logo";

const Footer = () => {

    return (
        <footer className="footer lg:p-10 bg-primary-clr text-white mx-auto items-center justify-around">
            <div>
                <div className="-ml-4 pt-12 lg:pt-0 -mb-2 lg:-mb-0">
                    <Logo></Logo>
                </div>
                <p>Hasbro Industries Ltd.<br />Providing reliable toy since 1992</p>
                <span className="mt-">Help | &copy; Jahid Howlader</span>
            </div>
            <div>
                <h4 className="text-xl">Address</h4>
                <p>163 Reilly Road Suite 715</p>
                <p>Virginia, USA</p>
                <p>Contact: 957.721.7139</p>
            </div>





            <div>
                <div className="grid grid-flow-col gap-4 text-3xl">

                    <Link to="https://twitter.com/JahidHowlader10" target="_blank">
                        <FaTwitter></FaTwitter>
                    </Link>

                    <Link to="https://www.youtube.com/" target="_blank">
                        <FaYoutube></FaYoutube>
                    </Link>

                    <Link to="https://www.facebook.com/jahidhowlader.info/" target="_blank">
                        <FaFacebookF></FaFacebookF>

                    </Link>
                </div>
                <div className=" space-x-2 mt-2">
                    <input type="text" className="p-2 text-black" placeholder="Email" />
                    <button className="bg-white  shadow-white text-black font-bold  mt-2 px-2 md:px-5 py-2">Send</button>
                </div>
                <p>Please keep in touch</p>
            </div>
        </footer>
    );
};

export default Footer;