import { Outlet } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import useAuth from "../../Hooks/Auth/useAuth";
import ProfileButton from "../../Components/Shared/Buttons/ProfileButton";
import { FaPowerOff } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import { MdSchedule } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { motion } from 'framer-motion';


const Profile = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();


    const { data: userData = [] } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`);
            return data;
        }
    });

    const { email, image, name } = userData;

    return (
        <div className="flex">


            {/* left navigate */}
            <div className="xl:w-[15dvw] md:w-[20dvw] w-[35dvw] min-h-screen">
                {/* top div */}
                <div className="flex p-5 border-b border-[#262626] gap-2">
                    <div>
                        <img src={image} alt="no image" className="size-10 md:size-8  rounded-sm" />
                    </div>
                    <div className=" text-[9px] md:text-xs">
                        <p className="break-all">{name}</p>
                        <p className="break-all">{email}</p>
                    </div>
                </div>
                {/* buttons */}
                <div className="md:px-5 xl:px-10 px-2 py-5">
                    <div className="space-y-5 font-lexend text-[10px] md:text-sm xl:text-base">
                        <ProfileButton to='basic' name='Basic Info' icon={<FaUserCircle />} />
                        <ProfileButton to='skills' name='Interest' icon={<GiSkills />} />
                        <ProfileButton to='history' name='Contributions' icon={<FaHandsHelping />} />
                        <ProfileButton to='availablity' name='Availability' icon={<MdSchedule />} />
                        <ProfileButton to='collaboration' name='Collaboration' icon={<IoPeopleSharp />} />
                    </div>
                    <div className="absolute bottom-5">
                        <motion.button
                            whileTap={{
                                scale: 0.9
                            }}
                            className="font-lexend flex items-center text-[10px] md:text-base gap-2">
                            <span>
                                <FaPowerOff />
                            </span>
                            Log Out
                        </motion.button>
                    </div>
                </div>
            </div>


            {/* outlet */}
            <div className=" xl:w-[85dvw] md:w-[80dvw] min-h-[200vh] w-[65dvw] px-5">
                <Outlet />
            </div>
        </div>
    );
};

export default Profile;