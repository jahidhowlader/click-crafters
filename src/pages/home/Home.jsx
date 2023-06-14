import { Helmet } from "react-helmet-async";
import ExploreClass from "./ExploreClass";
// import HomeBanner from "./HomeBanner";
import SubscribesBenifit from "./SubscribesBenifit";
import LearnNewSkill from "./LearnNewSkill";
import Instructors from "./Instructors";
import HomeSlider from "./HomeSlider";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home | Click Crafters</title>
            </Helmet>
            {/* <HomeBanner></HomeBanner> */}
            <HomeSlider></HomeSlider>
            <SubscribesBenifit></SubscribesBenifit>
            <LearnNewSkill></LearnNewSkill>
            <ExploreClass></ExploreClass>
            <Instructors></Instructors>
        </>
    );
};

export default Home;