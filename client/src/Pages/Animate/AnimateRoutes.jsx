import { AnimatePresence, motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import Loading from '../Loading/Loading';


const AnimateRoutes = ({ children }) => {

    const { loading } = useAuth();



    if (loading) return <Loading />;

    return (
        <AnimatePresence>
            <motion.div
                initial={{
                    opacity: 0,
                    x: -30
                }}
                animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                        ease: 'easeInOut',
                        duration: 1,
                        delay: 0.5
                    }
                }}
                exit={{
                    opacity: 0,
                    x: -50
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default AnimateRoutes;