import Swal from "sweetalert2";
import useAuthContext from "../../../hook/useAuthContext";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {

    // Context API
    const { loading, setLoading, googleSignin } = useAuthContext()

    // Navigate for redirect
    const navigate = useNavigate()

    // handlerGoogleSignin
    const handlerGoogleSignin = () => {

        googleSignin()
            .then(() => {
                
                setLoading(false)
                navigate('/')
            })
            .catch(e => {
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: `<span >${e.code}</span>`,
                })
            })
    }

    return (
        <div className="max-w-6xl mx-auto">
            {
                loading ?
                    <button className="bg-blue bg-opacity-60 text-white w-full py-3 mt-5 "><FaSpinner className="animate-spin text-center mx-auto"></FaSpinner></button> :
                    <button onClick={handlerGoogleSignin} className="bg-blue bg-opacity-60 text-white w-full py-3 mt-5">Sign-in with Google</button>
            }
        </div>
    );
};

export default SocialLogin;