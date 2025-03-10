import { useEffect, useState } from "react";
import image_2 from "/images/image_2.jpeg";
import image_3 from "/images/image_3.jpg";
import image_4 from "/images/image_4.jpg";
import image_5 from "/images/image_5.jpg";
import image_6 from "/images/image_6.webp";
import { AnimatePresence, motion } from "framer-motion";

const container = {
    show: { transition: { staggerChildren: 0.35 } },
};

const item = {
    hidden: { opacity: 0, y: 200 },
    show: { opacity: 1, y: 0, transition: { ease: "easeInOut", duration: 1.6 } },
    exit: { opacity: 0, y: -200, transition: { ease: "easeInOut", duration: 0.8 } },
};

const HomeLoading = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null; // Hide component after animation

    return (
        <div className="overflow-y-scroll scrollbar-hide">
            <AnimatePresence mode="wait">
                <motion.div
                    className="relative min-h-screen flex justify-center items-center"
                    variants={container}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                >
                    {/* Centered Main Image */}
                    <motion.img
                        variants={item}
                        className="absolute w-[50vw] max-w-[600px] h-auto object-contain"
                        src={image_6}
                        alt=""
                    />

                    {/* Floating Images - Responsive Positioning */}
                    <motion.img
                        variants={item}
                        className="absolute md:w-60 md:h-60 w-32 h-32 object-contain left-[10%] top-[25%]"
                        src={image_5}
                        alt=""
                    />
                    <motion.img
                        variants={item}
                        className="absolute md:w-60 md:h-60 w-24 h-24 object-contain right-[15%] top-[30%]"
                        src={image_4}
                        alt=""
                    />
                    <motion.img
                        variants={item}
                        className="absolute md:w-60 md:h-60 w-32 h-32 object-contain bottom-[20%] left-[10%]"
                        src={image_2}
                        alt=""
                    />
                    <motion.img
                        variants={item}
                        className="absolute md:w-60 md:h-60 w-28 h-28 object-contain bottom-[25%] right-[10%]"
                        src={image_3}
                        alt=""
                    />
                </motion.div>
            </AnimatePresence>
        </div>

    );
};

export default HomeLoading;
