import { Outlet } from "react-router-dom";
import ScrollTop from "../../Routes/ScrollTop";

const Main = () => {

    return (
        <div>
            <ScrollTop>
                <Outlet />
            </ScrollTop>
        </div>
    );
};

export default Main;