import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {

    const logo = 'ClickCrafters'

    return (
        <footer className="footer p-10 bg-black text-white mx-auto items-center justify-around">
            <div>
                <Link to="/" className="btn btn-ghost uppercase -ml-4">{logo.split('').map((word, idx) => <span key={idx} className="bg-white text-black w-4 h-4">{word}</span>)}</Link>
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