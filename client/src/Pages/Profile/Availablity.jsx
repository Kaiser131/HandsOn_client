import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/Auth/useAuth";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";

const Availablity = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [edit, setEdit] = useState(false);

    const { data: userData = [], refetch } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`);
            return data;
        }
    });

    const { image, language, preferredLocation, availability } = userData;

    const { mutateAsync } = useMutation({
        mutationFn: async (updateData) => {
            const { data } = await axiosSecure.patch(`/preferanceUpdate/${user?.email}`, updateData);
            return data;
        },
        onSuccess: () => {
            toast.success('Preferance Updated Successfully !');
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const availability = form.availability.value;
        const preferredLocation = form.preferredLocation.value;
        const language = form.language.value;

        const updateData = {
            availability,
            preferredLocation,
            language,
        };

        await mutateAsync(updateData);
        form.reset();
        refetch();
        setEdit(!edit);
    };

    return (
        <div id="basic" className="">

            <div>
                <h1 className="font-lexend text-center md:text-3xl text-sm mt-10">Availability & Preferences</h1>

                <form onSubmit={handleSubmit} className="my-10 font-raleway md:max-w-[1000px] w-full mx-auto">
                    <div className="flex justify-center my-10">
                        <img className="md:size-20 size-14 rounded" src={image} alt="mo image found" />
                    </div>

                    <div className="grid grid-cols-2 gap-5 space-y-5 ">

                        <div className="flex flex-col space-y-2 mt-5">
                            <label className="text-sm md:text-base font-bold" htmlFor="name">Availablity</label>
                            <input type="text" name="availability" required className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled={edit === false} placeholder={availability ? availability : 'Days Or Time'} />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm md:text-base font-bold" htmlFor="email">Preferred Location for Volunteering</label>
                            <input type="text" name="preferredLocation" required className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled={edit === false} placeholder={preferredLocation ? preferredLocation : 'Districk You wants to Work'} />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm md:text-base font-bold" htmlFor="phone">Languages</label>
                            <input type="text" name="language" required className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled={edit === false} placeholder={language ? language : 'Preferred Language'} />
                        </div>


                    </div>


                    <div className="flex justify-center my-10">
                        <button className={`${edit ? 'block' : 'hidden'} `}>Submit</button>
                    </div>

                </form>

                <div className="flex mt-10 justify-center">
                    <button className={`${edit ? 'hidden' : 'block'}`} onClick={() => setEdit(!edit)}>Edit</button>
                </div>



            </div>

        </div>
    );
};

export default Availablity;