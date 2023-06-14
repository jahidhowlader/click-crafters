import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import HomeSliderContent from "./HomeSliderContent";

const HomeSlider = () => {

    const [sliderRef] = useKeenSlider(
        {
            loop: true,
        },
        [
            (slider) => {
                let timeout
                let mouseOver = false
                function clearNextTimeout() {
                    clearTimeout(timeout)
                }
                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 2000)
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]
    )
    return (
        <>
            <div ref={sliderRef} className="keen-slider">
                <div className="keen-slider__slide number-slide1">
                    <div className="relative">
                        <img src="https://i.ibb.co/FhLdRNX/camera-7726630-1920.jpg" className="w-full h-[40vh] md:h-[85vh]" alt="" />
                        <HomeSliderContent></HomeSliderContent>
                    </div>

                </div>
                <div className="keen-slider__slide number-slide2">
                    <div className="relative">
                        <img src="https://i.ibb.co/CzFvD2Z/groom-putting-ring-bride-s-finger.jpg" className="w-full h-[40vh] md:h-[85vh]" alt="" />
                        <HomeSliderContent></HomeSliderContent>
                    </div>
                </div>
                <div className="keen-slider__slide number-slide3">
                    <div className="relative">
                        <img src="https://i.ibb.co/2ZJVGqQ/photography-1850469-1920.jpg" className="w-full h-[40vh] md:h-[85vh]" alt="" />
                        <HomeSliderContent></HomeSliderContent>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeSlider;