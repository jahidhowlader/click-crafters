import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Signin = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => console.log(data);

    return (
        <>
            <div className="bg-[#292929] py-40">
                <div className="bg-[#3D3D3D] max-w-6xl mx-auto p-12">
                    <h4 className="text-white text-2xl pb-3">SIGN-IN</h4>

                    <form onSubmit={handleSubmit(onSubmit)} >
                        {/* Email */}
                        <input type="email" placeholder="Username or Email" {...register("email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} className={`input input-bordered w-full rounded bg-transparent border-white ${errors.email ? 'border-orange focus:text-white' : 'text-white'} my-2`} />
                        {errors.email?.type === 'required' && <span className='text-orange'>Email is required</span>}
                        {errors.email?.type === 'pattern' && <span className='text-orange '>Email address is not validated</span>}

                        {/* Password */}
                        <input type="password" placeholder="Password" {...register("password", { required: true })} className={`input input-bordered w-full rounded bg-transparent border-white ${errors.password ? 'border-orange focus:text-white' : 'text-white'} my-2`} />
                        {errors.password && <span className="text-orange">Password is required</span>}

                        {/* Submit */}
                        <input type="submit" className="bg-white py-1 lg:py-3 px-3 lg:px-8 lg:text-xl block mt-2" />
                    </form>
                </div>

                <div className="max-w-6xl mx-auto">
                    <button className="bg-blue bg-opacity-60 text-white w-full py-3 mt-5">Sign-in with Google</button>
                    <Link to="/signup">
                        <p className='text-white mt-8 mb-4 text-center'>New here? <span className='font-bold '> Create a New Account</span></p>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Signin;