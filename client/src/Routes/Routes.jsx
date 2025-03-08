import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Sign/Login/Login";
import Register from "../Pages/Sign/Register/Register";
import Profile from "../Pages/Profile/Profile";
import ScrollTop from "./ScrollTop";
import BasicInfo from "../Pages/Profile/BasicInfo";
import Skills from "../Pages/Profile/Skills";
import VolantHistory from "../Pages/Profile/VolantHistory";
import Availablity from "../Pages/Profile/Availablity";
import Collaboration from "../Pages/Profile/Collaboration";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
        ],
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'register',
        element: <Register />
    },
    {
        path: 'profile',
        element: <ScrollTop>
            <Profile />
        </ScrollTop>,
        children: [
            {
                path: 'basic',
                element: <BasicInfo />
            },
            {
                path: 'skills',
                element: <Skills />
            },
            {
                path: 'history',
                element: <VolantHistory />
            },
            {
                path: 'availablity',
                element: <Availablity />
            },
            {
                path: 'collaboration',
                element: <Collaboration />
            },
        ]

    }
]);

export default router;