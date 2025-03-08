import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/Auth/useAuth";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";

const VolantHistory = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();


    const { data: userData = [] } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`);
            return data;
        }
    });

    const { image, events, contribution, achievements, testimonials } = userData;



    return (
        <div id="basic" className="">

            <div>
                <h1 className="font-lexend text-center md:text-3xl text-sm mt-10">Volunteering History & Contributions</h1>

                <form className="my-10 font-raleway md:max-w-[1000px] w-full mx-auto">
                    <div className="flex justify-center my-10">
                        <img className="md:size-20 size-14 rounded" src={image} alt="mo image found" />
                    </div>

                    <div className="grid grid-cols-2 gap-5 space-y-5 ">

                        <div className="flex flex-col space-y-2 mt-5">
                            <label className="text-sm md:text-base font-bold" htmlFor="name">Events Attended</label>
                            <input type="text" name="events" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" placeholder={events} />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm md:text-base font-bold" htmlFor="email">Total Hours Contributed</label>
                            <input type="text" name="text" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled placeholder={contribution} />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm md:text-base font-bold" htmlFor="phone">Badges & Achievements</label>
                            <input type="text" name="achievements" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled placeholder={achievements} />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm md:text-base font-bold" htmlFor="location">Testimonials & Endorsements</label>
                            <input type="text" name="testimonial" className="bg-[#DFDFF0] text-[9px] placeholder:font-light md:text-base outline-none placeholder:text-black border-b border-black disabled:cursor-not-allowed" disabled placeholder={testimonials} />
                        </div>

                    </div>


                </form>


            </div>

        </div>
    );
};

export default VolantHistory;