
const CoursesCard = ({ course }) => {

    const { thumbnail, title, instructors_name, available_seat, price } = course

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
                <button className="px-3 text-xl text-blue opacity-70 font-medium uppercase py-3" disabled={available_seat == 0 ? true : false}>Course Enrole</button>
            </div>
        </div>
    );
};

export default CoursesCard;