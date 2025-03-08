import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/Auth/useAuth";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import { useState } from "react";

const Collaboration = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [edit, setEdit] = useState(false);

    const { data: userData = [] } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`);
            return data;
        }
    });

    const { email, image, name, phone, from, bio } = userData;

    const handleEdit = () => {
        setEdit(!edit);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEdit(!edit);
    };

    return (
        <div id="basic" className="">

            <div>
                <h1 className="font-lexend text-center md:text-3xl text-sm mt-10">Social & Team Collaboration</h1>

                <form onSubmit={handleSubmit} className="my-10 font-raleway md:max-w-[1000px] w-full mx-auto">
                    <div className="flex justify-center my-10">
                        <img className="md:size-20 size-14 rounded" src={image} alt="mo image found" />
                    </div>

                    <div className="grid grid-cols-2 gap-5 space-y-5 ">

                        <div className="flex flex-col space-y-2 mt-5">
                            <label className="text-sm md:text-base font-bold" htmlFor="name">Name</label>
                            <input type="text" name="name" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled={edit === false} placeholder={name} />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm md:text-base font-bold" htmlFor="email">Email</label>
                            <input type="text" name="email" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled placeholder={email} />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm md:text-base font-bold" htmlFor="phone">Phone Number</label>
                            <input type="text" name="phone" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled={edit === false} placeholder={phone ? phone : 'Please add number'} />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm md:text-base font-bold" htmlFor="location">Location</label>
                            <input type="text" name="location" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled={edit === false} placeholder={from ? from : 'Please add Location'} />
                        </div>

                    </div>

                    <div className="flex flex-col justify-center mt-10">

                        <div className="flex flex-col space-y-2">
                            <label className="text-sm md:text-base text-center font-bold" htmlFor="bio">Bio</label>
                            <input type="text" name="bio" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed text-center" placeholder={bio ? bio : 'Please Add Your Bio'} />
                        </div>

                    </div>

                    <div className="flex justify-center my-10">
                        <button className={`${edit ? 'block' : 'hidden'} `}>Submit</button>
                    </div>

                </form>

                <div className="flex mt-10 justify-center">
                    <button className={`${edit ? 'hidden' : 'block'}`} onClick={handleEdit}>Edit</button>
                </div>



            </div>

        </div>
    );
};

export default Collaboration;