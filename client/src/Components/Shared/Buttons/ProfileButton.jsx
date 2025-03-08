import { Link } from "react-router-dom";

import { motion } from 'framer-motion';

const ProfileButton = ({ to, name, icon }) => {
    return (
        <motion.div
        >
            <motion.button
                whileTap={{
                    scale: 1.2,
                }}
                whileHover={{
                    x: 20,
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
            >
                <Link to={to} className="px-4 py-2 outline-none gap-2 flex items-center" > <span className="hidden md:block">{icon}</span> {name}</Link>
            </motion.button>
        </motion.div>
    );
};

export default ProfileButton;