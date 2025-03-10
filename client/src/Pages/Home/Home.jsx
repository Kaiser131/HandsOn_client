import HomeLoading from "../Loading/HomeLoading";
import Banner from "../../Components/Home/Home/Banner";
import { useEffect, useState } from "react";
import AllData from "../../Components/Home/Home/AllData";

const Home = () => {
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    useEffect(() => {
        // Wait for HomeLoading animation to complete (4 seconds)
        const timer = setTimeout(() => {
            setIsLoadingComplete(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="relative">
            {!isLoadingComplete && <HomeLoading />}
            {isLoadingComplete && <Banner />}
            {isLoadingComplete && <AllData />}
        </div>
    );
};

export default Home;