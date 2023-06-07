
const HomeBanner = () => {
    return (
        <div className="relative">
            <video className="h-auto " src="https://downloads.creativelive.com/homepage/hero_video_v2.mp4" preload="true" playsInline muted autoPlay loop ></video>

            <div className="absolute text-white bottom-5 left-5 md:bottom-40 md:left-10 lg:top-1/3 lg:left-28 lg:pt-20">
                <h1 className="text-3xl lg:text-6xl font-bold">Do what you love.</h1>
                <p className="lg:text-xl lg:py-3 pb-2">Learn the skills you need to live your <br /> dreams in career, hobby, and life.</p>
                <button className="bg-blue py-1 lg:py-3 px-3 lg:px-8 lg:text-xl">GET STARTED</button>
            </div>
        </div>
    );
};

export default HomeBanner;