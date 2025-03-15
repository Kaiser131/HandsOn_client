import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";

const AllTeams = () => {

    const axiosSecure = useAxiosSecure();
    const { data = [] } = useQuery({
        queryKey: ['allteams'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/allTeams');
            return data;
        }
    });

    return (
        <div>
            <h1 className="text-[clamp(20px,4vw,35px)] text-center my-10 font-lexend">All Teams</h1>
            <table className="min-w-full border border-gray-300 bg-[#DFDFF0] shadow-md rounded">
                <thead>
                    <tr className="bg-[#D3D3F0] font-raleway">
                        <th className="p-2 text-left text-[clamp(8px,2vw,15px)]"></th>
                        <th className="p-2 text-left text-[clamp(8px,2vw,15px)]">Team Name</th>
                        <th className="p-2 text-left text-[clamp(8px,2vw,15px)]">Type</th>
                        <th className="p-2 text-left text-[clamp(8px,2vw,15px)] hidden md:block">Location</th>
                        <th className="p-2 text-left text-[clamp(8px,2vw,15px)]">Category</th>
                        <th className="p-2 text-left text-[clamp(8px,2vw,15px)]">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((team, index) => (
                        <tr key={index} className="border-t border-gray-300">
                            <td className="p-2">
                                <img src={team.imageURL} alt={team.teamName} className="hidden md:block w-10 h-10 rounded-full" />
                            </td>
                            <td className="p-2 text-[clamp(8px,2vw,15px)]">{team?.teamName}</td>
                            <td className="p-2 text-[clamp(8px,2vw,15px)]">{team?.type}</td>
                            <td className="p-2 text-[clamp(8px,2vw,15px)] hidden md:block">{team?.location}</td>
                            <td className="p-2 text-[clamp(8px,2vw,15px)]">{team?.category}</td>
                            <td className="p-2">
                                <button className="px-2 py-1 text-[clamp(8px,2vw,15px)] bg-blue-500 text-white rounded hover:bg-blue-600">
                                    Join
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllTeams;