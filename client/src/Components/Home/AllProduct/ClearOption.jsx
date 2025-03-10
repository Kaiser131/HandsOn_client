


import { motion } from "framer-motion";


const ClearOption = ({ text, Icon, handleCLear, handleDropDownOptionData }) => {

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
            onClick={() => handleCLear()}
            className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-[#D2D2EF] text-slate-700 transition-colors cursor-pointer"
        >
            <motion.span variants={actionIconVariants}>
                <Icon />
            </motion.span>
            <span>{text}</span>
        </motion.li>
    );
};

export default ClearOption;
