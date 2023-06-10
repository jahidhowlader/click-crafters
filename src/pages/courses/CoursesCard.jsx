import { useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../../hook/useAuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useState } from "react";

const CoursesCard = ({ course }) => {
    // Auth Context
    const { user } = useAuthContext()

    // get Data from Explore class using props
    const { thumbnail, title, instructors_name, available_seat, price, _id } = course

    // Navigator hook for redirect routes
    const navigator = useNavigate()
    const location = useLocation()

    // handlerEnroll
    const [disable, setDisable] = useState(false)
    const handlerSelect = () => {
        if (!user) {
            return navigator('/signin', { state: { from: location } })
        }

        const selectedCourse = {
            course_id: _id,
            title,
            instructors_name,
            price,
            email: user.email
        }

        fetch('http://localhost:5000/selected-courses', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(selectedCourse)
        })
            .then(() => {
                setDisable(true)
                toast.success('Successfully Added Course', {
                    position: "top-right",
                    autoClose: 1000,
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
                    title: `<span >${e}</span>`,
                })
            })
    }

    return (
        <div className={`${available_seat == 0 ? 'bg-orange' : 'bg-primary-clr'} text-white flex flex-col justify-between`}>
            <div>
                <div>
                    <img src={thumbnail} alt={title} className="w-full h-[250px]" />
                </div>
                <h3 className=" px-3 pt-2 text-xl uppercase font-bold">{title}</h3>
                <p className="px-3 font-thin">With {instructors_name}</p>
                <div className="p-3 flex justify-between items-center italic text-lg ">
                    <p>Available seats: {available_seat}</p>
                    <p>Price: ${price}</p>
                </div>
            </div>
            <div>
                <hr className="border-white border-opacity-30 " />
                <button onClick={handlerSelect} className={`px-3 text-xl ${(available_seat == 0 || disable) ? 'text-white' : 'text-blue opacity-70'}  font-medium uppercase py-3`} disabled={(available_seat == 0 || disable) ? true : false}>Course Select</button>
            </div>
        </div>
    );
};

export default CoursesCard;