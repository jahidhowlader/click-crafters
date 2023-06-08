
const SubscribesBenifit = () => {
    return (
        <section className="grid grid-cols-2 my-container lg:my-32 gap-20 items-center">
            <div>
                <h3 className="font-bold text-3xl pb-8">Subscribe for access to 2000 classes taught by the worlds top experts</h3>
                <ul className="space-y-2 text-[22px] list-disc font-mono opacity-90 lg:pl-14">
                    <li>Get started for less than $13/month</li>
                    <li>24/7 access via desktop, mobile or TV</li>
                    <li>New classes added every month</li>
                    <li>Download lessons for offline viewing</li>
                    <li>Exclusive content for subscribers</li>
                </ul>
                <button className="bg-blue text-white py-1 lg:py-3 px-3 lg:px-8 lg:text-xl mt-12">LEARN MORE</button>

            </div>
            <div>
                <img src="https://mm.creativelive.com/fit/https%3A%2F%2Fdownloads.creativelive.com%2Fcreator-pass%2Fcallout-photo.jpg/800" alt="subscribe" />
            </div>
        </section>
    );
};

export default SubscribesBenifit;