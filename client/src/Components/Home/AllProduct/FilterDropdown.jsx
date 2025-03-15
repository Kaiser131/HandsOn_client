import { FiChevronDown, } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";
import Option from "./Option";
import { IoInfiniteSharp } from "react-icons/io5";
import ClearOption from "./ClearOption";

const FilterDropdown = ({ dropBtnText, dropDownOptionsData, setCurrentPage, setFilterDropdownData, setSearch }) => {

    const [open, setOpen] = useState(false);

    const handleDropDownOptionData = (text) => {
        // setCurrentPage(1);
        setFilterDropdownData(text);
        setOpen(false);
    };

    const handleCLear = () => {
        setFilterDropdownData('');
        // setSearch('');
        setOpen(false);
    };


    const wrapperVariants = {
        open: {
            scaleY: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
        closed: {
            scaleY: 0,
            transition: {
                when: "afterChildren",
                staggerChildren: 0.1,
            },
        },
    };

    const iconVariants = {
        open: { rotate: 180 },
        closed: { rotate: 0 },
    };



    return (
        <div className=" flex items-center justify-center relative z-50 ">
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <button
                    onClick={() => setOpen((pv) => !pv)}
                    className="flex font-lexend py-4 px-5 md:px-[70px]  items-center whitespace-nowrap  "
                >
                    <span className="font-light text-black text-xs md:text-base">{dropBtnText}</span>
                    <motion.span variants={iconVariants}>
                        <FiChevronDown />
                    </motion.span>
                </button>

                <div className="relative z-50">
                    <motion.ul
                        initial={wrapperVariants.closed}
                        variants={wrapperVariants}
                        style={{ originY: "top", translateX: "-80%" }}
                        className="flex flex-col gap-2 p-2 rounded-lg shadow-2xl top-[120%] left-[180%] lg:left-[50%] w-48 absolute z-50 bg-[#DFDFF0]"
                    >
                        {dropDownOptionsData?.map((got, idx) => (
                            <Option key={idx} handleDropDownOptionData={handleDropDownOptionData} setOpen={setOpen} Icon={got?.icon} text={got?.name} />
                        ))}
                        <ClearOption handleCLear={handleCLear} Icon={IoInfiniteSharp} text="All" />
                    </motion.ul>
                </div>
            </motion.div>
        </div>
    );
};



export default FilterDropdown;