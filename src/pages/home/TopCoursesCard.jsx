// Import Swiper React components
import './TopCoursesCard.css'

const TopCoursesCard = ({ course }) => {

    const { title, thumbnail, students, available_seat } = course

    return (
        <div className={`shadow-lg ${available_seat == 0 ? 'bg-orange' : 'bg-white'} h-[400px]  relative flex flex-col justify-between`}>
            <div>
                <div className={`absolute top-2 right-2 ${available_seat == 0 ? 'block' : 'hidden'}`}>
                    <p className='bg-orange px-5 py-2 font-bold'>Reserved</p>
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
                <button className={`${available_seat == 0 ? 'bg-white' : 'bg-blue hover:bg-primary-clr hover:text-white'} w-full text-center mb-5 uppercase py-2 font-bold`}
                    disabled={available_seat == 0 ? true : false}>Enroll</button>
            </div>
        </div>
    );
};

export default TopCoursesCard;