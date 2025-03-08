import { Outlet } from "react-router-dom";
import ScrollTop from "../../Routes/ScrollTop";
import Navbar from "../../Components/Shared/Navbar/Navbar";

const Main = () => {

    return (
        <div>
            <Navbar />
            <ScrollTop>
                <Outlet />
            </ScrollTop>
        </div>
    );
};

export default Main;