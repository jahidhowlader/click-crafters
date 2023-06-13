import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";

const InstructorSwiperCard = ({ topInstructors, slidesPerView }) => {
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
                topInstructors.map(course =>
                    <SwiperSlide key={course._id}>
                       <div className="flex items-center ">
                        <img src={course.image} alt="" height='200px' className="hover:bg-opacity-70"/>
                       </div>
                    </SwiperSlide>
                )
            }
        </Swiper>
    );
};

export default InstructorSwiperCard;