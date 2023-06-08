import { useLoaderData } from "react-router-dom";
import TopCoursesCard from "./TopCoursesCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { FreeMode, Pagination } from "swiper";

const ExploreClass = () => {

    const courses = useLoaderData()
    const topSellingCourses = courses.sort((a, b) => +b.students - +a.students).slice(0, 6)
    console.log(topSellingCourses);

    return (
        <section className="py-32 my-container ">
            <h2 className="text-center font-bold text-3xl">Explore our classes</h2>

            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
            >
                {
                    topSellingCourses.map((course, idx) =>
                        <SwiperSlide key={idx}>
                            <TopCoursesCard
                                course={course}
                            ></TopCoursesCard>
                        </SwiperSlide>

                      
                    )
                }
            </Swiper>
        </section>
    );
};

export default ExploreClass;