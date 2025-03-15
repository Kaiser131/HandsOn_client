import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/Auth/useAuth";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import { useState } from "react";
import { imageUpload } from "../../Utils/ImageUpload";
import toast from "react-hot-toast";

const BasicInfo = () => {

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

    const { mutateAsync } = useMutation({
        mutationFn: async (updateData) => {
            const { data } = await axiosSecure.patch(`/basicUpdate/${user?.email}`, updateData);
            return data;
        },
        onSuccess: () => {
            toast.success('Data Updated Successfully !');
        }
    });

    const { email, image, name, phone, location: from, bio } = userData;

    const handleEdit = () => {
        setEdit(!edit);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const location = form.location.value;
        const bio = form.bio.value;
        const image = form.image.files[0];

        const imageUrl = await imageUpload(image);
        const updateData = {
            name,
            phone,
            location,
            bio,
            image: imageUrl
        };
        form.reset();
        await mutateAsync(updateData);
        setEdit(!edit);
        refetch();
    };

    return (
        <div id="basic" className="">

            <div>
                <h1 className="font-lexend text-center md:text-3xl text-sm mt-10">Basic Information</h1>

                <form onSubmit={handleSubmit} className="my-10 md:max-w-[1000px] w-full mx-auto font-raleway">
                    <div className="flex justify-center my-10">
                        <img className="md:size-20 size-14 rounded" src={image} alt="mo image found" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5 space-y-5 ">

                        <div className="flex flex-col space-y-2 mt-5">
                            <label className="text-sm md:text-base font-bold" htmlFor="name">Name</label>
                            <input type="text" required name="name" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled={edit === false} placeholder={name} />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm md:text-base font-bold" htmlFor="email">Email</label>
                            <input type="text" required name="email" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled placeholder={email} />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm md:text-base font-bold" htmlFor="phone">Phone Number</label>
                            <input type="text" required name="phone" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled={edit === false} placeholder={phone ? phone : 'Please add number'} />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm md:text-base font-bold" htmlFor="location">Location</label>
                            <input type="text" required name="location" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled={edit === false} placeholder={from ? from : 'Please add Location'} />
                        </div>

                    </div>


                    <div className="flex flex-col space-y-2">
                        <label className="text-sm md:text-base text-center font-bold" htmlFor="bio">Bio</label>
                        <input type="text" required name="bio" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed text-center" placeholder={bio ? bio : 'Please Add Your Bio'} />
                    </div>

                    <div className="flex flex-col space-y-2 pt-4 md:pt-0">
                        <label className="text-sm md:text-base text-center font-bold" htmlFor="image">Update Image</label>
                        <div className="flex justify-center">
                            <input type="file" required name="image" className="file:bg-[#DFDFF0] w-[150px] md:w-full file:text-[9px] md:file:text-base placeholder:text-[9px] outline-none file:border file:rounded-full" id="" />
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

export default BasicInfo;