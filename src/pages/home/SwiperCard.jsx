import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";
import TopCoursesCard from "./TopCoursesCard";

const SwiperCard = ({ topSellingCourses, slidesPerView }) => {
    return (
        <Swiper
            slidesPerView={slidesPerView}
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
    );
};

export default SwiperCard;