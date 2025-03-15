import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/Auth/useAuth";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import { useState } from "react";
import { imageUpload } from "../../Utils/ImageUpload";
import toast from "react-hot-toast";

const Collaboration = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [edit, setEdit] = useState(false);
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    console.log(type);



    const { data: userData = [] } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`);
            return data;
        }
    });

    // add team data
    const { mutateAsync: addTeamData } = useMutation({
        mutationFn: async (addTeam) => {
            const { data } = await axiosSecure.post('/team', addTeam);
            return data;
        },
        onSuccess: () => {
            toast.success('Your Team Creation Successful !');
        }
    });

    const { email, image, name, phone, from, bio, teamName } = userData;

    const handleEdit = () => {
        setEdit(!edit);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const teamName = form.teamName.value;
        const location = form.location.value;
        const bio = form.bio.value;
        const image = form.image.files[0];
        const logo = await imageUpload(image);
        const uniqueCode = crypto.randomUUID();
        const teamData = {
            teamName,
            location,
            bio,
            type,
            logo,
            teamCode: uniqueCode,
            category,
            teamOwner: user?.email
        };
        await addTeamData(teamData);
        form.reset();
        setEdit(!edit);
    };

    return (
        <div>

            <div>
                <h1 className="font-lexend text-center md:text-3xl text-sm mt-10">Create a Team</h1>

                <form onSubmit={handleSubmit} className="my-10 font-raleway md:max-w-[1000px] w-full mx-auto">
                    <div className="flex justify-center my-10">
                        <img className="md:size-20 size-14 rounded" src={image} alt="mo image found" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 space-y-5 ">

                        <div className="flex flex-col space-y-2 mt-5 col-span-2 md:col-span-1 ">
                            <label className="text-sm md:text-base font-bold" htmlFor="name">Name</label>
                            <input required type="text" name="teamName" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled={edit === false} placeholder={teamName || 'Team Name'} />
                        </div>

                        <div className="flex flex-col space-y-2 col-span-2 md:col-span-1">
                            <label className="text-sm md:text-base font-bold" htmlFor="location">Location</label>
                            <input required type="text" name="location" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled={edit === false} placeholder={from ? from : 'Please add Location'} />
                        </div>

                        <div className="flex flex-col space-y-2 col-span-2 md:col-span-1">
                            <label className="text-sm md:text-base font-bold" htmlFor="causes">Type</label>
                            <select
                                onChange={(e) => setType(e.target.value)}
                                disabled={edit === false}
                                className="outline-none bg-[#DFDFF0] disabled:cursor-not-allowed">
                                <option disabled selected>Select</option>
                                <option value="Private">Private</option>
                                <option value="Public">Public</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>

                        <div className="flex flex-col space-y-2 col-span-2 md:col-span-1">
                            <label htmlFor="" className="text-sm md:text-base font-bold">Category</label>
                            <select
                                disabled={edit === false}
                                onChange={(e) => setCategory(e.target.value)}
                                className="outline-none bg-[#DFDFF0] disabled:cursor-not-allowed" >
                                <option className="outline-none bg-[#D3D3F0]" disabled selected>Select</option>
                                <option className="outline-none bg-[#D3D3F0]" value="Environmental Initiatives">Environmental Initiatives</option>
                                <option className="outline-none bg-[#D3D3F0]" value="Education & Mentorship">Education & Mentorship</option>
                                <option className="outline-none bg-[#D3D3F0]" value="Health & Wellness">Health & Wellness</option>
                                <option className="outline-none bg-[#D3D3F0]" value="Homelessness & Housing">Homelessness & Housing</option>
                                <option className="outline-none bg-[#D3D3F0]" value="Animal Welfare">Animal Welfare</option>
                                <option className="outline-none bg-[#D3D3F0]" value="Disaster Relief & Emergency Response">Disaster Relief & Emergency Response</option>
                                <option className="outline-none bg-[#D3D3F0]" value="Social Justice & Advocacy">Social Justice & Advocacy</option>
                                <option className="outline-none bg-[#D3D3F0]" value="Arts & Culture">Arts & Culture</option>
                                <option className="outline-none bg-[#D3D3F0]" value="Senior Care & Support">Senior Care & Support</option>
                                <option className="outline-none bg-[#D3D3F0]" value="Youth & Child Support">Youth & Child Support</option>
                                <option className="outline-none bg-[#D3D3F0]" value="Community Building & Engagement">Community Building & Engagement</option>
                            </select>
                        </div>

                        <div className="flex flex-col space-y-2 col-span-2 md:col-span-1">
                            <label className="text-sm md:text-base text-center font-bold" htmlFor="image">Upload Logo</label>
                            <div className="md:flex md:justify-center">
                                <input type="file" required name="image" className="file:bg-[#DFDFF0] w-[150px] md:w-full file:text-[9px] md:file:text-base placeholder:text-[9px] outline-none file:border file:rounded-full" id="" />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 col-span-2 md:col-span-1">
                            <label className="text-sm md:text-base font-bold" htmlFor="bio">Bio</label>
                            <input required type="text" disabled={edit === false} name="bio" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed " placeholder={bio ? bio : 'Please Add Your Bio'} />
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


            {/* My team Members section */}
            <div>
                <h1 className="font-lexend md:text-3xl text-sm mt-10">My Team Members</h1>
            </div>


        </div>
    );
};

export default Collaboration;