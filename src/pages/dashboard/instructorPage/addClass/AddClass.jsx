import { Helmet } from "react-helmet-async";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuthContext from "../../../../hook/useAuthContext";
import useAxiosSecure from "../../../../hook/useAxiosSecure";

const AddClass = () => {

    // Context API
    const { user, iconLoading, setIconLoading } = useAuthContext()

    // axiosSecure
    const [axiosSecure] = useAxiosSecure()

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {

        setIconLoading(true)

        const formData = new FormData()
        formData.append('image', data.thumbnail[0])

        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, {
            method: "POST",
            body: formData
        })
            .then(data => data.json())
            .then(resImage => {
                console.log(resImage);

                if (resImage.success) {

                    const imageUrl = resImage.data.display_url

                    const { title, avaiableSeat, price } = data
                    const newCourse = {
                        title,
                        instructors_name: user.displayName,
                        instructors_email: user.email,
                        price,
                        available_seat: avaiableSeat,
                        students: '0',
                        thumbnail: imageUrl,
                        status: "pending"
                    }

                    console.log(newCourse);

                    axiosSecure.post('/add-class', newCourse)
                        .then(newData => {

                            setIconLoading(false)
                            reset()
                            if (newData.data.insertedId) {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'New Courses Added',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })
            .catch(e => {
                setIconLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: `<span >${e}</span>`,
                })
            })



    }

    return (
        <>
            <Helmet>
                <title>Add Class | Click Crafters</title>
            </Helmet>

            <section className="py-8">

                <div className="bg-[#3D3D3D]  mx-auto p-12">
                    <h3 className="text-3xl font-bold uppercase text-center pb-5 text-white">Add Class</h3>

                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div>
                            {/* Class Name */}
                            <input type="text" placeholder="Course Name" {...register("title", { required: true })} className={`input input-bordered w-full rounded bg-transparent border-white ${errors.title ? 'border-orange focus:text-white' : 'text-white'} my-2`} />
                            {errors.title && <span className='text-orange'>Course Name is required</span>}
                        </div>

                        <div className="grid grid-cols-2 gap-x-5">

                            <div>
                                {/* Instructor Name */}
                                <input type="text" placeholder="Name" defaultValue={user.displayName} className="input input-bordered w-full rounded bg-transparent border-white my-2" disabled />
                            </div>

                            <div>
                                {/* Instructor Email */}
                                <input type="email" placeholder="Email" defaultValue={user.email} className="input input-bordered w-full rounded bg-transparent border-white my-2" disabled />
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-x-5">

                            <div>
                                {/* Avaible Seat */}
                                <input type="text" placeholder="Avaiable Seat" {...register("avaiableSeat", { required: true })} className={`input input-bordered w-full rounded bg-transparent border-white ${errors.avaiableSeat ? 'border-orange focus:text-white' : 'text-white'} my-2`} />
                                {errors.avaiableSeat && <span className='text-orange'>Avaiable Seat is required</span>}
                            </div>

                            <div>
                                {/* Price */}
                                <input type="text" placeholder="Price" {...register("price", { required: true })} className={`input input-bordered w-full rounded bg-transparent border-white ${errors.price ? 'border-orange focus:text-white' : 'text-white'} my-2`} />
                                {errors.price && <span className='text-orange'>Price is required</span>}
                            </div>
                        </div>

                        <div>
                            <input type="file" placeholder="Thumbnail" {...register("thumbnail", { required: true })} className="file-input file-input-bordered w-full max-w-xs my-2" />
                            {errors.thumbnail && <span className='text-orange block'>Course Thumbnail is required</span>}
                        </div>

                        {/* Submit */}
                        {
                            iconLoading ? <>
                                <button className="py-1 lg:py-4 px-3 lg:px-14 lg:text-xl block mt-2 bg-white">
                                    <FaSpinner className="animate-spin"></FaSpinner>
                                </button>
                            </> :
                                <input type="submit" value="Add item" className={`${iconLoading ? 'bg-black' : 'bg-white'} cursor-pointer py-1 lg:py-3 px-3 lg:px-8 lg:text-xl block mt-2`} />
                        }
                    </form>
                </div>
            </section>
        </>
    );
};

export default AddClass;