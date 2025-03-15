import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from 'framer-motion';
const FillUpBtn = ({ text, size = 60 }) => {

    const [isHover, setIsHover] = useState(false);

    return (
        <div>
            <div className='whiteFilledButtonContainer px-9 py-3 whitespace-nowrap'
                onMouseEnter={(e) => setIsHover(true)}
                onMouseLeave={(e) => setIsHover(false)}
            >
                <motion.div className="circle" animate={{
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
                        color: isHover ? '#FFFFFF' : '#000000'
                    }}
                >
                    <p>{text}</p>
                </motion.div>
                <motion.div className="iconContainer"
                    animate={{
                        x: isHover ? 0 : 35
                    }}
                >
                    <FaArrowRight className="icon" />
                </motion.div>
            </div>
        </div >
    );
};

export default FillUpBtn;