import axios from "axios";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;