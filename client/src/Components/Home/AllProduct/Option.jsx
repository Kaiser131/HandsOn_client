


import { motion } from "framer-motion";


const Option = ({ text, Icon, setOpen, handleDropDownOptionData }) => {

    const itemVariants = {
        open: {
            opacity: 1,
            y: 0,
            transition: {
                when: "beforeChildren",
            },
        },
        closed: {
            opacity: 0,
            y: -15,
            transition: {
                when: "afterChildren",
            },
        },
    };


    const actionIconVariants = {
        open: { scale: 1, y: 0 },
        closed: { scale: 0, y: -7 },
    };





    return (
        <motion.li
            variants={itemVariants}
            onClick={() => handleDropDownOptionData(text)}
            className="flex items-center gap-2 w-full p-2 text-[10px] capitalize md:text-xs font-medium whitespace-nowrap rounded-md hover:bg-[#D2D2EF] text-slate-700 transition-colors cursor-pointer z-50"
        >
            <motion.span variants={actionIconVariants}>
                <Icon />
            </motion.span>
            <span>{text}</span>
        </motion.li>
    );
};

export default Option;
