import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import SocialLogin from "../../shared/socialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../../../hook/useAuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Signin = () => {

    const [customError, setCustomError] = useState(false)

    // Context API
    const { loading, setLoading, signIn } = useAuthContext()

    // Password Show and hidden
    const [showPassword, setShowPassword] = useState(false)
    const handlerShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Navigate for redirect
    const navigate = useNavigate()

    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    const onSubmit = data => {
        setCustomError(false)

        signIn(data.email, data.password)
            .then(() => {

                reset()
                setLoading(false)
                toast.success('Successfully Signin', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate(from, { replace: true })
            })
            .catch(e => {

                setLoading(false)
                setCustomError(true)
                Swal.fire({
                    icon: 'error',
                    title: `<span >${e.code}</span>`,
                })
            })
    };

    return (
        <>
            <Helmet>
                <title>Signin | Click Crafters</title>
            </Helmet>
            <div className="bg-[#292929] py-40">
                <div className="bg-[#3D3D3D] max-w-6xl md:mx-auto p-5 md:p-12 mx-5">
                    <h4 className="text-white text-2xl pb-3">SIGN-IN</h4>

                    <form onSubmit={handleSubmit(onSubmit)} >
                        {/* Email */}
                        <input type="email"
                            placeholder="Email"
                            {...register("email",
                                {
                                    required: true,
                                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                }
                            )}
                            className={`input input-bordered w-full rounded bg-transparent  ${errors.email?.type === 'required' || customError ? 'border-orange focus:text-white' : 'border-white text-white'} my-2`} />
                        {errors.email?.type === 'required' && <span className='text-orange'>Email is required</span>}
                        {errors.email?.type === 'pattern' && <span className='text-orange '>Email address is not validated</span>}

                        {/* Password */}
                        <div className="relative">
                            {
                                showPassword ? <FaEyeSlash onClick={handlerShowPassword} className="text-white absolute right-4 text-2xl top-5"></FaEyeSlash> : <FaEye onClick={handlerShowPassword} className="text-white absolute right-4 text-2xl top-5"></FaEye>
                            }
                            <input type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                {...register("password", { required: true })}
                                className={`input input-bordered w-full rounded bg-transparent  ${errors.password || customError ? 'border-orange focus:text-white' : 'border-white text-white'} my-2`} />
                            {errors.password && <span className="text-orange">Password is required</span>}
                        </div>

                        {/* Submit */}
                        {
                            loading ? <>
                                <button className="py-1 lg:py-4 px-3 lg:px-14 lg:text-xl block mt-2 bg-white">
                                    <FaSpinner className="animate-spin"></FaSpinner>
                                </button>
                            </> :
                                <input type="submit" className={`${loading ? 'bg-black' : 'bg-white'} py-1 lg:py-3 px-3 lg:px-8 lg:text-xl block mt-2`} disabled={loading ? true : false} />
                        }
                    </form>
                </div>

                <SocialLogin></SocialLogin>
                <Link to="/signup" state={location.state}>
                    <p className='text-white mt-8 mb-4 text-center' >New here? <span className='font-bold '> Create a New Account</span></p>
                </Link>
            </div>
        </>
    );
};

export default Signin;