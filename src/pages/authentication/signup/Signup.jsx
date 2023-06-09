import { useForm } from "react-hook-form";
import useAuthContext from "../../../hook/useAuthContext";
import SocialLogin from "../../shared/socialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { FaSpinner } from "react-icons/fa";
import '../Authentication.css'

const Signup = () => {

    // Context API
    const { loading, setLoading, signUp, updateUser } = useAuthContext()

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    // Navigate for redirect
    const navigate = useNavigate()

    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    const onSubmit = data => {

        const formData = new FormData()
        formData.append('image', data.photoURL[0])

        // create User
        signUp(data.email, data.password)
            .then(() => {

                setLoading(true)

                // upload Image
                fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, {
                    method: 'POST',
                    body: formData
                })
                    .then(res => res.json())
                    .then(imagData => {

                        setLoading(true)
                        const img = imagData.data.display_url

                        // Updated Profile
                        updateUser(data.name, img)
                            .then(() => {

                                const savedUser = {
                                    name: data.name,
                                    email: data.email,
                                    role: 'user'
                                }

                                fetch('http://localhost:5000/users', {
                                    method: "POST",
                                    headers: {
                                        "content-type": "application/json"
                                    },
                                    body: JSON.stringify(savedUser)
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        if (data.insertedId) {
                                            Swal.fire({
                                                icon: 'success',
                                                title: `<span >Successfully Create Account, Thanks!</span>`,
                                            })
                                            reset()
                                            setLoading(false)
                                            navigate(from, { replace: true })
                                        }
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
                    })
                    .catch(e => {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: `<span >${e}</span>`,
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
        <>
            <Helmet>
                <title>Signup | Click Crafters</title>
            </Helmet>
            <div className="bg-[#292929] py-40">
                <div className="bg-[#3D3D3D] max-w-6xl mx-auto p-12">
                    <h4 className="text-white text-2xl pb-3">SIGN-UP</h4>

                    <form onSubmit={handleSubmit(onSubmit)} >

                        <div className="grid grid-cols-2 gap-x-5">

                            <div>
                                {/* Name */}
                                <input type="text" placeholder="Username" {...register("name", { required: true })} className={`input input-bordered w-full rounded bg-transparent border-white ${errors.name ? 'border-orange focus:text-white' : 'text-white'} my-2`} />
                                {errors.name && <span className='text-orange'>Name is required</span>}
                            </div>

                            <div>
                                {/* Email */}
                                <input type="email" placeholder="Email" {...register("email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} className={`input input-bordered w-full rounded bg-transparent border-white ${errors.email ? 'border-orange focus:text-white' : 'text-white'} my-2`} />
                                {errors.email?.type === 'required' && <span className='text-orange'>Email is required</span>}
                                {errors.email?.type === 'pattern' && <span className='text-orange '>Email address is not validated</span>}
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-x-5">

                            <div>
                                {/* Password */}
                                <input type="password" placeholder="Password" {...register("password", { required: true, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8}/ })} className={`input input-bordered w-full rounded bg-transparent border-white ${errors.password ? 'border-orange focus:text-white' : 'text-white'} my-2`} />
                                {errors.password?.type === 'required' && <span className="text-orange">Password is required</span>}
                                {errors.password?.type === 'pattern' && <span className='text-orange '>Password will be 1 number, 1 Capital and 1 special character </span>}
                            </div>

                            <div>
                                {/* Confirm Password */}
                                <input type="password" placeholder="Confirm Password" {...register("confirmPassword", { required: true, validate: (value) => value === watch('password') })} className={`input input-bordered w-full rounded bg-transparent border-white ${errors.confirmPassword ? 'border-orange focus:text-white' : 'text-white'} my-2`} />
                                {errors.confirmPassword?.type === 'required' && <span className="text-orange">Confirm Password is required</span>}
                                {errors.confirmPassword?.type === 'validate' && <span className='text-orange '>Password do not match </span>}
                            </div>
                        </div>

                        <div>
                            <input type="file" placeholder="Photo URL" {...register("photoURL", { required: true })} className={`bg-transparent text-white my-2`} />
                            {errors.photoURL && <span className='text-orange block'>PhotoURL is required</span>}
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
                <Link to="/signin">
                    <p className='text-white mt-8 mb-4 text-center'>Alrady have an account? <span className='font-bold '> Please Signin..</span></p>
                </Link>
            </div>
        </>
    );
};

export default Signup;