import { Outlet } from "react-router-dom";
import ScrollTop from "../../Routes/ScrollTop";

const Dashboard = () => {
    return (
        <div>
            <ScrollTop>
                <Outlet />
            </ScrollTop>
        </div>
    );
};

export default Dashboard;