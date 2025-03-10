import { MdPostAdd } from "react-icons/md";
import { FaHandsHelping } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { BiFilterAlt } from "react-icons/bi";

import { MdCategory } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";


import { motion } from 'framer-motion';
import CreateButton from "../../Shared/Buttons/CreateButton";
import FilterDropdown from "../AllProduct/FilterDropdown";
import { useState } from "react";
import EventModal from "../../Shared/Modal/EventModal";

const AllData = () => {

    const [filterDropDownData, setFilterDropdownData] = useState('');
    const [eventModalOpen, setEventModalOpen] = useState(false);
    const [category, setCategory] = useState('');
    const filterDropdownOptionsData = [
        { name: 'Category', icon: MdCategory },
        { name: 'Location', icon: FaMapMarkerAlt },
        { name: 'Availability', icon: AiOutlineCheckCircle },
    ];

    const handleEventData = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const date = form.date.value;
        const time = form.time.value;
        const location = form.location.value;

        console.log(
            title,
            description,
            date,
            time,
            location,
        );

        // form.reset();

    };

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;

        // form.reset();
    };


    return (
        <div className="min-h-screen pt-20">

            <div className=" relative z-20 md:max-w-[60dvw] w-full mx-auto">
                <div className=" space-y-3 px-2 text-center">
                    <h1 className="font-lexend text-[clamp(22px,5vw,40px)] ">Welcome To HandsOn</h1>
                    <h1 className="font-lexend text-[clamp(10px,2vw,18px)]">The best platform to reunion</h1>
                </div>


                {/* post event filter search button section */}
                <div className="bg-[#d3d3f0] flex justify-evenly items-center mt-5 rounded md:p-5 font-lexend">

                    <div className="relative font-lexend z-50">
                        <FilterDropdown
                            // setCurrentPage={setCurrentPage}
                            dropDownOptionsData={filterDropdownOptionsData}
                            dropBtnText="Filter"
                            setFilterDropdownData={setFilterDropdownData}
                        // setSearch={setSearch}
                        />
                    </div>

                    <div onClick={() => setEventModalOpen(true)}>
                        <CreateButton text='Create Event' Icon={MdPostAdd} />
                    </div>

                    <div>
                        <CreateButton text='Create Post' Icon={FaHandsHelping} />
                    </div>

                    <div>
                        <form onSubmit={handleSearch} className="flex items-center">
                            <input type="text" placeholder="Search" name="search" className="placeholder:text-[8px] text-[8px] md:text-base md:placeholder:text-base outline-none bg-[#D2D2EF] w-[50px] text-base md:w-full" />
                            <button className="md:text-2xl"><AiOutlineSearch /></button>
                        </form>
                    </div>


                </div>

                {/* create Event modal */}
                <EventModal open={eventModalOpen} setOpen={setEventModalOpen}>
                    <div className="mx-auto max-w-2xl space-y-4 px-5">

                        <form onSubmit={handleEventData}>
                            <h1 className=" text-[clamp(20px,4vw,36px)]  text-center py-5">Create Event</h1>
                            <div className="grid grid-cols-2 gap-5">

                                <div className="flex flex-col">
                                    <label htmlFor="">Title</label>
                                    <input type="text" name="title" className="bg-[#DFDFF0] border-b outline-none border-black" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="">Description</label>
                                    <input type="text" name="description" className="bg-[#DFDFF0] border-b outline-none border-black" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="">Date</label>
                                    <input type="date" name="date" className="bg-[#DFDFF0] border-b outline-none border-black" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="">Time</label>
                                    <input type="time" name="time" className="bg-[#DFDFF0] border-b outline-none border-black" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="">Location</label>
                                    <input type="text" name="location" className="bg-[#DFDFF0] border-b outline-none border-black" />
                                </div>

                                <div>
                                    <label htmlFor="">Category</label>
                                    <select onChange={(e) => setCategory(e.target.value)} className="outline-none bg-[#DFDFF0] px-4 py-2 rounded" >
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
                            </div>

                            <button className="px-8 py-2 border border-black">
                                Post
                            </button>

                        </form>

                    </div>
                </EventModal>

            </div>

        </div>
    );
};

export default AllData;