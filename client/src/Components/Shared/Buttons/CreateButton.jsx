import { motion } from "framer-motion";

const CreateButton = ({ Icon, text }) => {
    return (
        <motion.div
        >
            <motion.button
                whileTap={{
                    scale: 1.2,
                }}
                whileHover={{
                    x: 15,
                    transition: {
                        ease: 'easeInOut',
                        duration: 0.4
                    }
                }}
                animate={{
                    transition: {
                        ease: 'easeInOut',
                        duration: 1
                    }
                }}
                className="flex items-center px-3 md:gap-5 text-[8px] md:text-sm"
            >
                <Icon className="text-xs md:text-2xl" /> {text}
            </motion.button>
        </motion.div>
    );
};

export default CreateButton;