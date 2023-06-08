import { Helmet } from "react-helmet-async";
import ExploreClass from "./ExploreClass";
import HomeBanner from "./HomeBanner";
import SubscribesBenifit from "./SubscribesBenifit";
import LearnNewSkill from "./LearnNewSkill";

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
        </>
    );
};

export default Home;