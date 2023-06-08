import { Helmet } from "react-helmet-async";
import ExploreClass from "./ExploreClass";
import HomeBanner from "./HomeBanner";
import SubscribesBenifit from "./SubscribesBenifit";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home | Click Crafters</title>
            </Helmet>
            <HomeBanner></HomeBanner>
            <SubscribesBenifit></SubscribesBenifit>
            <ExploreClass></ExploreClass>
        </>
    );
};

export default Home;