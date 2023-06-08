import { useLoaderData } from "react-router-dom";
import SwiperCard from "./SwiperCard";

const ExploreClass = () => {

    const courses = useLoaderData()
    const topSellingCourses = courses.sort((a, b) => +b.students - +a.students).slice(0, 6)

    return (
        <section className="py-16 md:py-32 my-container px-2 md:px-0">
            <h2 className="text-center font-bold text-3xl">Explore our classes</h2>

            <div className="hidden md:block">
                <SwiperCard
                    topSellingCourses={topSellingCourses}
                    slidesPerView={4}
                ></SwiperCard>
            </div>

            <div className="md:hidden">
                <SwiperCard
                    topSellingCourses={topSellingCourses}
                    slidesPerView={1}
                ></SwiperCard>
            </div>
        </section>
    );
};

export default ExploreClass;