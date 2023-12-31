import { Fade, Slide } from "react-awesome-reveal";

const SubscribesBenifit = () => {
    return (
        <section className="grid md:grid-cols-2 my-container my-8 lg:my-32 gap-5 md:gap-20 items-center px-2 md:px-0">
            <div>
                <Slide>
                    <h3 className="font-bold text-2xl md:text-3xl pb-8">Subscribe for access to 2000 classes taught by the worlds top experts</h3>
                </Slide>
                <ul className="space-y-2 text-[22px] list-disc md:font-mono opacity-90 lg:pl-14 pl-8">
                    <Fade delay={1e3} cascade damping={1e-1}>
                        <li>Get started for less than $13/month</li>
                        <li>24/7 access via desktop, mobile or TV</li>
                        <li>New classes added every month</li>
                        <li>Download lessons for offline viewing</li>
                        <li>Exclusive content for subscribers</li>
                    </Fade>
                </ul>
                <button className="bg-blue text-white py-1 lg:py-3 px-3 lg:px-8 lg:text-xl mt-5 md:mt-12">LEARN MORE</button>

            </div>
            <div>
                <img src="https://mm.creativelive.com/fit/https%3A%2F%2Fdownloads.creativelive.com%2Fcreator-pass%2Fcallout-photo.jpg/800" alt="subscribe" />
            </div>
        </section>
    );
};

export default SubscribesBenifit;