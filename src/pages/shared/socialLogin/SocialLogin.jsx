import Swal from "sweetalert2";
import useAuthContext from "../../../hook/useAuthContext";
import { FaSpinner } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {

    // Context API
    const { loading, setLoading, googleSignin } = useAuthContext()

    // Navigate for redirect
    const navigate = useNavigate()

    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    // handlerGoogleSignin
    const handlerGoogleSignin = () => {

        googleSignin()
            .then(result => {

                const logedinUser = result.user
                const savedUser = {
                    name: logedinUser.displayName,
                    email: logedinUser.email,
                    role: 'user'
                }

                setLoading(false)

                fetch('http://localhost:5000/users', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(() => {

                        setLoading(false)
                        navigate(from, { replace: true })
                    })
                    .catch(e => {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: `<span >${e.code}</span>`,
                        })
                    })
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
        <div className="max-w-6xl mx-5 md:mx-auto">
            {
                loading ?
                    <button className="bg-blue bg-opacity-60 text-white w-full py-3 mt-5 "><FaSpinner className="animate-spin text-center mx-auto"></FaSpinner></button> :
                    <button onClick={handlerGoogleSignin} className="bg-blue bg-opacity-60 text-white w-full py-3 mt-5">Sign-in with Google</button>
            }
        </div>
    );
};

export default SocialLogin;