import Marquee from "react-fast-marquee";
import image_7 from "/images/image_7.webp";
import { animate, motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const banner = {
    animate: {
        transition: {
            delayChildren: 0.4,
            staggerChildren: 0.1,
        },
    },
};

const letterAnimation = {
    initial: { y: 400, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { ease: "easeInOut", duration: 1.5 } },
};

const marqueeContainer = {
    animate: { transition: { staggerChildren: 0.1 } },
};

const Banner = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const firstText = "Inspire";
    const marqueText = "Commitment";
    const lastText = "Thrive";

    return (
        <div ref={ref} className="">
            <div className="max-w-[90dvw] mx-auto">
                <div className="relative">
                    <div className="pt-36 md:space-y-2 relative z-10">
                        <div className="flex justify-between md:gap-20">
                            <motion.span
                                variants={banner}
                                initial="initial"
                                whileInView="animate"
                                animate={isInView ? "animate" : "initial"}
                                className="inline-block overflow-hidden"
                            >
                                {[...firstText].map((letter, idx) => (
                                    <motion.span
                                        className="inline-block font-lexend text-[clamp(10px,9vw,8rem)] "
                                        key={idx}
                                        variants={letterAnimation}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </motion.span>

                            <div className="w-[100px] md:w-[300px] xl:w-[400px]">
                                <p className="font-lexend text-[clamp(6px,1vw,1.5rem)] ">
                                    Believe in yourself, and conquer every challenge along the way. Your victory is within reach—never stop striving.
                                </p>
                            </div>
                        </div>

                        <Marquee speed={110} className="overflow-y-scroll scrollbar-hide py-5">
                            <motion.div
                                variants={marqueeContainer}
                                initial="initial"
                                animate={isInView ? "animate" : "initial"}
                                className="flex"
                            >
                                {[...marqueText].map((letter, idx) => (
                                    <motion.span
                                        className="inline-block font-lexend text-[clamp(10px,9vw,8rem)]"
                                        key={idx}
                                        variants={letterAnimation}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </Marquee>

                        <p className="absolute md:px-8 md:py-9 p-4 left-5 bottom-7 md:left-16 md:bottom-0 text-[clamp(6px,1vw,1.5rem)] font-lexend bg-[#EFEEF1] rounded-full">
                            Scroll <br /> Down
                        </p>
                        <div className="flex justify-center">
                            <motion.span
                                variants={banner}
                                initial="initial"
                                animate={isInView ? "animate" : "initial"}
                                className="inline-block overflow-hidden"
                            >
                                {[...lastText].map((letter, idx) => (
                                    <motion.span
                                        className="inline-block font-lexend text-[clamp(2rem,10vw,8rem)]"
                                        key={idx}
                                        variants={letterAnimation}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </motion.span>
                        </div>
                    </div>

                    <div className="z-0 -mt-14">
                        <img className="w-full" src={image_7} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
