import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import useAuth from "../../Hooks/Auth/useAuth";
import { IoMdTrash } from "react-icons/io";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Attends = () => {

    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
    const { data = [], refetch } = useQuery({
        queryKey: ['myEvents', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/eventAttendeeList/${user?.email}`);
            return data;
        }
    });

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/attendeeList/${id}`);
            return data;
        },
        onSuccess: () => {
            refetch();
            toast.success('Event Deleted');
        }
    });

    const handleDelete = async (id) => {
        await mutateAsync(id);
    };


    return (
        <div>
            <h1 className="text-[clamp(20px,4vw,35px)] text-center my-10 font-lexend">Attended Events</h1>
            <table className="min-w-full border border-gray-300 bg-[#DFDFF0] shadow-md rounded">
                <thead>
                    <tr className="bg-[#D3D3F0] font-raleway">
                        <th className="p-2 text-left text-[clamp(8px,2vw,15px)] hidden md:block"></th>
                        <th className="p-2 text-left text-[clamp(8px,2vw,15px)]">Event Name</th>
                        <th className="p-2 text-left text-[clamp(8px,2vw,15px)]">Location</th>
                        <th className="p-2 text-left text-[clamp(8px,2vw,15px)]">Date</th>
                        <th className="p-2 text-left text-[clamp(8px,2vw,15px)]">Time</th>
                        <th className="p-2 text-left text-[clamp(8px,2vw,15px)] hidden md:block">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((team, index) => (
                        <tr key={index} className="border-t border-gray-300">
                            <td className="p-2 hidden md:block">
                                <img src={team.imageURL} alt={team.teamName} className="w-10 h-10 rounded-full" />
                            </td>
                            <td className="p-2 text-[clamp(8px,2vw,15px)]">{team?.title}</td>
                            <td className="p-2 text-[clamp(8px,2vw,15px)]">{team?.location}</td>
                            <td className="p-2 text-[clamp(8px,2vw,15px)]">{team?.date}</td>
                            <td className="p-2 text-[clamp(8px,2vw,15px)]">{team?.time}</td>
                            <td className="p-2 hidden md:flex text-center">
                                <motion.button
                                    whileTap={{ scale: 1.3 }}
                                    onClick={() => handleDelete(team?._id)}
                                    className="px-2 py-1 text-[clamp(8px,2vw,15px) pb-3 text-2xl rounded">
                                    <IoMdTrash />
                                </motion.button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default Attends;