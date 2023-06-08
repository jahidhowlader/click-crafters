
const InstructorCard = ({ instructor }) => {

    const { image, title, instructors_email, instructors_name } = instructor
    return (
        <div className="">
            <img className="" src={image} alt={title} style={{ height: '250px', width: '280px' }}></img>
            {/* card content */}
            <div className="">
                <h2 className='pt-3 pb- text-xl font-bold'>{instructors_name}</h2>
                <p>{instructors_email}</p>
            </div>
        </div>
    );
};

export default InstructorCard;