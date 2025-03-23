import bg from '/images/sign_bg.webp';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaLock, FaLockOpen } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa6';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../../../Hooks/Auth/useAuth';
import EncryptButton from '../../../Components/Shared/Buttons/EncryptBtn';
import Loading from '../../Loading/Loading';

const Register = () => {


    const [passText, setPassText] = useState(true);
    const [confirmPassText, setConfirmPassText] = useState(true);

    const { createUser, logOut, signInWithGoogle, loading, user, setLoading } = useAuth();
    const navigate = useNavigate();

    // if (loading) {
    //     return <Loading></Loading>;
    // }

    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
        const emailChecker = emailRegex.test(email);
        const passChecker = passRegex.test(password);

        // email check
        if (!emailChecker) {
            return toast.error('Provide a valid Email');
        }

        // pass checker
        if (!passChecker) {
            return toast.error('Password should contain atleast 6 numbers 1 capital 1 small and one speacial character');
        }
        if (password !== confirmPassword) {
            return toast.error('Password is not matched !');
        }


        try {
            const signIn = await createUser(email, password);
            logOut();
            if (signIn) {
                navigate('/login');
                toast.success('User Created Successfully !');
                return toast.success('Please Log In again !');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    };

    const handleGoogleLogin = async () => {
        await signInWithGoogle();
        setLoading(false);
        navigate('/');
    };

    if (user) return <Navigate to='/' />;

    if (loading) return <Loading />;

    return (
        <div
            className="relative min-h-screen w-full flex justify-center md:justify-start bg-cover bg-center"
            style={{ backgroundImage: `url('${bg}')` }}
        >
            <div className=" absolute inset-0 bg-black bg-opacity-5"></div>

            <div className=' relative z-10 min-h-screen md:w-3/5 lg:w-2/5 md:glass flex flex-col justify-center items-center w-[500px] h-[600px]'>

                <form onSubmit={handleSignUp} className="text-left flex justify-center flex-col items-center text-white ">

                    <div className='w-[350px] md:w-[400px] '>
                        <h1 className="text-4xl font-lexend my-10">SignUp Now!</h1>
                        <div className='flex flex-col space-y-5'>
                            <input required className='glass py-4 pl-4 pr-16 text-left outline-none rounded-sm font-raleway text-sm' placeholder='Email' type="email" name="email" />
                            <div className='relative'>
                                <input required className='glass py-4 pl-4  w-full pr-16 text-left outline-none rounded-sm font-raleway text-sm' placeholder='Password' type={passText ? "password" : "text"} name="password" />
                                <span onClick={() => setPassText(!passText)} className='absolute right-5 top-4'> {passText ? <FaLock /> : <FaLockOpen />} </span>
                            </div>
                            <div className='relative'>
                                <input required className='glass py-4 pl-4 w-full pr-16 text-left outline-none rounded-sm font-raleway text-sm' placeholder='Confirm Password' type={confirmPassText ? "password" : "text"} name="confirmPassword" />
                                <span onClick={() => setConfirmPassText(!confirmPassText)} className='absolute right-5 top-4'>{confirmPassText ? <FaLock /> : <FaLockOpen />}</span>
                            </div>
                            <span className=''>
                                {/* <button className='px-5 py-2 border border-white border-opacity-50'>Sign Up</button> */}
                                <EncryptButton name='Sign Up' logo={<FaLock />} />
                            </span>
                        </div>
                    </div>

                </form>
                <div className='border-t-[1px] my-12 border w-2/5' />

                {/* lower buttons */}
                <div>
                    <div className='text-white text-center'>
                        <h1 className='capitalize font-lexend'>or SignUp with</h1>
                        <div className='flex my-5 gap-5 justify-center'>
                            <button onClick={handleGoogleLogin} className='text-3xl'><FcGoogle /></button>
                            <button className='text-3xl text-blue-600'><FaFacebook /></button>
                            <button className='text-3xl'><FaGithub /></button>
                        </div>
                    </div>

                    <h1 className='capitalize text-sm text-left text-white'>already have an account ? <Link to='/login' className='hover:text-blue-500 transition-all'>login</Link> </h1>
                </div>



            </div>



        </div>



    );
};

export default Register;