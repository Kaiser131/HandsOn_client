import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from 'framer-motion';
const WhiteFillupBtn = ({ text, size = 60 }) => {

    const [isHover, setIsHover] = useState(false);

    return (
        <div>
            <div className='blackFilledButtonContainer px-9 py-3 whitespace-nowrap'
                onMouseEnter={(e) => setIsHover(true)}
                onMouseLeave={(e) => setIsHover(false)}
            >
                <motion.div className="whiteCircle" animate={{
                    scale: isHover ? size : 1,

                }}
                    transition={{
                        ease: 'easeIn',
                        duration: 0.5
                    }}
                ></motion.div>
                <motion.div className="title"
                    animate={{
                        x: isHover ? -8 : 0,
                        color: isHover ? '#000000' : '#FFFFFF'
                    }}
                >
                    <p>{text}</p>
                </motion.div>
                <motion.div className="iconContainer"
                    animate={{
                        x: isHover ? 0 : 35
                    }}
                >
                    <FaArrowRight className="blackIcon" />
                </motion.div>
            </div>
        </div >
    );
};

export default WhiteFillupBtn;