import { Helmet } from "react-helmet-async";
import ExploreClass from "./ExploreClass";
import HomeBanner from "./HomeBanner";
import SubscribesBenifit from "./SubscribesBenifit";
import LearnNewSkill from "./LearnNewSkill";
import Instructors from "./Instructors";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home | Click Crafters</title>
            </Helmet>
            <HomeBanner></HomeBanner>
            <SubscribesBenifit></SubscribesBenifit>
            <LearnNewSkill></LearnNewSkill>
            <ExploreClass></ExploreClass>
            <Instructors></Instructors>

            {/* <div className="flex items-center justify-center">
                <p>1</p>
                <p>2</p>
            </div> */}
        </>
    );
};

export default Home;