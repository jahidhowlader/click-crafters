import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import CoursesCard from "./CoursesCard";

const Courses = () => {

    const courses = useLoaderData()

    return (
        <>
            <Helmet>
                <title>Courses | Click Crafters</title>
            </Helmet>

            <section className="grid grid-cols-4 gap-2 py-32 bg-[#292929] px-5">
                {
                    courses.map((course, idx) => <CoursesCard
                    key={idx}
                    course={course}
                    ></CoursesCard> )
                }
            </section>
        </>
    );
};

export default Courses;