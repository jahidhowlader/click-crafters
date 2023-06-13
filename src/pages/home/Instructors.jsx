import { useEffect, useState } from "react";
import InstructorSwiperCard from "./InstructorSwiperCard";

const Instructors = () => {

    const [instructors, setInstructors] = useState([])
    useEffect(() => {

        fetch('/public/instructor.json')
            .then(res => res.json())
            .then(data => {
                setInstructors(data)
            })
    }, [])

    // console.log(instructors);

    return (
        <section className="">
            <h2 className="text-center font-bold text-3xl">Learn from the industry icons</h2>
            <p className="text-center text-xl py-5">Pulitzer Prize winners. Cultural icons. Your new instructors. Unlock 700+ <br /> greats to inspire, teach, and support your passion.</p>

            <div className="hidden md:block">
                <InstructorSwiperCard
                    topInstructors={instructors}
                    slidesPerView={6}
                ></InstructorSwiperCard>
            </div>

            <div className="md:hidden">
                <InstructorSwiperCard
                    topInstructors={instructors}
                    slidesPerView={1}
                ></InstructorSwiperCard>
            </div>
        </section>
    );
};

export default Instructors;