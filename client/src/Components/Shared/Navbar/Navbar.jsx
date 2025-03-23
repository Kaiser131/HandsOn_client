import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWindowScroll } from "react-use";
import { FaOpencart, FaUser } from "react-icons/fa6";
import { motion } from 'framer-motion';
import useAuth from "../../../Hooks/Auth/useAuth";
import { Menu, X } from "lucide-react";
import ProfileButton from "../Buttons/ProfileButton";
import { AiOutlineMenu } from "react-icons/ai";
import { GiCrossedAxes } from "react-icons/gi";
import { HiOutlineHome } from "react-icons/hi";


const Navbar = () => {

    const { user, logOut } = useAuth();
    const location = useLocation();

    const navContainerRef = useRef(null);
    const navItems = [
        { name: 'Home', destination: '/' },
    ];

    // scroll implementation using react-use
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const { y: currentScrollY } = useWindowScroll();


    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisible(true),
                navContainerRef.current.classList.remove('floating-nav');
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false),
                navContainerRef.current.classList.add('floating-nav');
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true),
                navContainerRef.current.classList.add('floating-nav');
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);


    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2
        });
    }, [isNavVisible]);






    return (
        <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 ">
            <header className="absolute top-1/2 w-full -translate-y-1/2 ">
                <nav className={`flex size-full items-center justify-between p-4 ${location?.pathname !== '/' ? 'floating-nav' : ''} `}>

                    <div className="flex items-center gap-7">
                        <Link to='/'><motion.button
                            initial={{
                                opacity: 0,
                                y: -40
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    delay: 2,
                                    duration: 2,
                                    ease: 'easeInOut'
                                }

                            }}
                            className={`font-kaushan  text-3xl ${location?.pathname === '/' && currentScrollY === 0 ? 'text-black' : 'text-white'}`}>HandsOn</motion.button></Link>
                    </div>




                    <motion.div
                        className={`flex  h-full items-center ${location?.pathname === '/' && currentScrollY === 0 ? 'text-black' : 'text-white'}`}>

                        <div className={` hidden md:block`}>
                            {navItems.map((nav, idx) => (
                                <Link key={idx} to={nav?.destination} >
                                    <button className={`uppercase nav-hover-btn`}>{nav?.name}</button>
                                </Link>
                            ))}
                        </div>

                        {!user && <Link to='/login' className="nav-hover-btn" >login</Link>}
                        <Link to='profile/basic' className="nav-hover-btn" >Profile</Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="nav-hover-btn text-xl"
                        >
                            <AiOutlineMenu />
                        </button>

                    </motion.div>


                    <motion.div
                        initial={{}}
                        animate={{ x: isOpen ? -300 : 0 }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="absolute md:py-5 right-[-300px] top-14 w-40 md:w-64 rounded-lg bg-black text-white shadow-lg"
                    >
                        <button
                            onClick={() => setIsOpen(!open)}
                            className="absolute  text-white p-4 text-xl md:text-2xl right-2 md:right-10 top-5 hover:text-white"
                        >
                            <GiCrossedAxes />
                        </button>
                        <nav className="mt-10 flex flex-col gap-4 text-xs md:text-sm text-white">
                            <ProfileButton to='/' name='Home' icon={<HiOutlineHome />} />
                            <ProfileButton to='profile/basic' name='Profile' icon={<FaUser />} />
                        </nav>
                    </motion.div>





                </nav>
            </header>
        </div>
    );
};

export default Navbar;