// Import Swiper React components
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../hook/useAuthContext';
import './TopCoursesCard.css'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useState } from 'react';
import useSelectedCourse from '../../hook/useSelectedCourse';

const TopCoursesCard = ({ course }) => {

    // Already Seleted Course course
    const [selectedCourses] = useSelectedCourse()
    const seletedCourseId = selectedCourses.map(singleCourse => singleCourse.course_id)

    // Auth Context
    const { user } = useAuthContext()

    // get Data from Explore class using props
    const { _id, title, thumbnail, students, available_seat, instructors_name, price } = course

    // Navigator hook for redirect routes
    const navigator = useNavigate()

    // handlerSELECT 
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
            email: user.email,
            available_seat,
            students
        }

        fetch('https://click-crafters-server-jahidhowlader.vercel.app/selected-courses', {
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
        <div className={`shadow-lg ${available_seat == 0 ? 'bg-red text-white' : 'bg-white'} h-[400px]  relative flex flex-col justify-between`}>
            <div>
                <div className={`absolute top-2 right-2 ${available_seat == 0 ? 'block' : 'hidden'}`}>
                    <p className='bg-red px-5 py-2 font-bold'>Reserved</p>
                </div>
                <img src={thumbnail} alt={title} />
                <div className='p-3'>
                    <h3 className="uppercase font-semibold pt-2">{title}</h3>
                    <div className='italic pt-5'>
                        <p>Total Students: {students}</p>
                        <p>Available Seat: {available_seat}</p>
                    </div>
                </div>
            </div>

            <div className='px-3'>
                <button onClick={handlerSelect}
                    disabled={seletedCourseId.includes(_id) ? true : false}
                    className={`bg-blue hover:bg-primary-clr hover:text-white w-full text-center mb-5 uppercase py-2 font-bold ${available_seat == 0 || disable || seletedCourseId.includes(_id)? 'hidden' : 'block'}`}>
                    {seletedCourseId.includes(_id) ? 'Already Selected' : 'Course Select'}
                </button>
            </div>
        </div>
    );
};

export default TopCoursesCard;