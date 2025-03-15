import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/Auth/useAuth";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Skills = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [edit, setEdit] = useState(false);
    const [volunterType, setVolunterType] = useState();

    const { data: userData = [], refetch } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`);
            return data;
        }
    });

    const { causes, skills, image } = userData;

    const { mutateAsync } = useMutation({
        mutationFn: async (updateData) => {
            const { data } = await axiosSecure.patch(`/skillUpdate/${user?.email}`, updateData);
            return data;
        },
        onSuccess: () => {
            toast.success('Skills Updated Successfully !');
        }
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const causes = form.causes.value;
        const skills = form.skills.value;

        if (!volunterType) return toast.error('Select Volunteer Type');

        const updateData = {
            causes,
            skills,
            volunterType
        };

        await mutateAsync(updateData);
        form.reset();
        refetch();
        setEdit(!edit);
    };

    return (
        <div id="basic" className="">

            <div>
                <h1 className="font-lexend text-center md:text-3xl text-sm mt-10">Skills && Interest</h1>

                <form onSubmit={handleSubmit} className="my-10 font-raleway md:max-w-[1000px] w-full mx-auto">
                    <div className="flex justify-center my-10">
                        <img className="md:size-20 size-14 rounded" src={image} alt="mo image found" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 space-y-5 ">

                        <div className="flex flex-col space-y-2 mt-5">
                            <label className="text-sm md:text-base font-bold" htmlFor="skills">Skills</label>
                            <input type="text" required name="skills" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled={edit === false} placeholder={skills} />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm md:text-base font-bold" htmlFor="causes">Causes for support</label>
                            <input type="text" required name="causes" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled={edit === false} placeholder={causes} />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-sm md:text-base font-bold" htmlFor="causes">Preferred Volunteering Type</label>
                            <select
                                disabled={edit === false}
                                onChange={(e) => setVolunterType(e.target.value)}
                                className="outline-none bg-[#DFDFF0] disabled:cursor-not-allowed">
                                <option disabled selected>Select</option>
                                <option value="remote">Remote</option>
                                <option value="In-Person">In Person</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>


                    </div>



                    <div className="flex justify-center my-10">
                        <motion.button
                            whileHover={{ backgroundColor: "black", color: "white", }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className={`
                            ${edit ? 'block' : 'hidden'}
                            px-8 py-2 border font-sirin border-black`}
                        >
                            Submit
                        </motion.button>
                    </div>

                </form>

                <div className="flex justify-center my-10">
                    <motion.button
                        onClick={() => setEdit(!edit)}
                        whileHover={{ backgroundColor: "black", color: "white", }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`
                            ${edit ? 'hidden' : 'block'}
                            px-8 py-2 border font-sirin border-black`}
                    >
                        Edit
                    </motion.button>
                </div>



            </div>

        </div>
    );
};

export default Skills;