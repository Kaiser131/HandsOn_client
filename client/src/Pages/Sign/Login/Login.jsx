import bg from '/images/sign_bg.webp';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaLock, FaLockOpen } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa6';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../../../Hooks/Auth/useAuth';
import EncryptButton from '../../../Components/Shared/Buttons/EncryptBtn';

const Login = () => {

    const [passText, setPassText] = useState(true);
    const navigate = useNavigate();


    const location = useLocation();
    const from = location?.state || '/';

    const { login, signInWithGoogle, loading, user, setLoading } = useAuth();
    // if (loading) {
    //     return <Loading></Loading>;
    // }

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
        const emailChecker = emailRegex.test(email);
        const passChecker = passRegex.test(password);

        if (!emailChecker) {
            return toast.error('Provide a valid Email');
        }

        // pass checker
        if (!passChecker) {
            return toast.error('Password should contain atleast 6 numbers 1 capital 1 small and one speacial character');
        }


        try {

            const signIn = await login(email, password);
            navigate(from);
            toast.success('Login Successful !');

        } catch (error) {
            console.log(error);
            if (error.code === 'auth/invalid-credential') {
                toast.error('Password or Email not matched');
            } else if (error.code === 'auth/wrong-password') {
                toast.error('Incorrect password. Please check and try again.');
            } else if (error.code === 'auth/invalid-email') {
                toast.error('Invalid email format.');
            } else if (error.code === 'auth/user-disabled') {
                toast.error('This account has been disabled.');
            } else if (error.code === 'auth/user-not-found') {
                toast.error('User not found. Please check your email.');
            } else if (error.code === 'auth/too-many-requests') {
                toast.error('Too many unsuccessful login attempts. Try again later.');
            } else {
                // General error message for unexpected errors
                toast.error(error.message || 'An unknown error occurred.');
            }
        }

    };

    const handleGoogleLogin = async () => {
        await signInWithGoogle();
        setLoading(false);
        navigate('/');
    };

    if (user) return <Navigate to='/' />;

    return (
        <div
            className="relative min-h-screen w-full flex justify-center md:justify-start bg-cover bg-center"
            style={{ backgroundImage: `url("${bg}")` }}
        >
            {/* Black Overlay */}
            <div className=" absolute inset-0 bg-black bg-opacity-5"></div>

            {/* Centered Content Box with Shadow */}
            <div className=' relative z-10 min-h-screen md:w-3/5 lg:w-2/5 md:glass flex flex-col justify-center items-center w-[500px] h-[600px]'>

                <form onSubmit={handleLogin} className="text-left flex justify-center  flex-col items-center text-white ">

                    <div className='w-[350px] md:w-[400px] '>
                        <h1 className="text-4xl font-lexend my-10">Login Now!</h1>
                        <div className='flex flex-col space-y-5'>
                            <input required className='glass py-4 w-full pl-4 pr-16 text-left outline-none rounded-sm font-raleway text-sm' placeholder='Email' type="email" name="email" />
                            <div className='relative'>
                                <input required className='glass w-full py-4 pl-4 pr-16 text-left outline-none rounded-sm font-raleway text-sm' placeholder='Password' type={passText ? "password" : "text"} name="password" />
                                <span onClick={() => setPassText(!passText)} className='absolute right-5 top-4'> {passText ? <FaLock /> : <FaLockOpen />} </span>
                            </div>
                            <span >
                                <EncryptButton name='Login' logo={<FaLock />} />
                            </span>
                        </div>
                    </div>

                </form>

                <div className='border-t-[1px] my-12 border w-2/5' />

                <div>
                    <div className='text-white text-center'>
                        <h1 className='capitalize font-lexend'>or SignUp with</h1>
                        <div className='flex justify-center my-5 gap-5'>
                            <button onClick={handleGoogleLogin} className='text-3xl'><FcGoogle /></button>
                            <button className='text-3xl text-blue-600'><FaFacebook /></button>
                            <button className='text-3xl'><FaGithub /></button>
                        </div>
                    </div>

                    <h1 className='capitalize text-sm text-left text-white'>already have an account ? <Link to='/register' className='hover:text-blue-500 transition-all'>SignUp</Link> </h1>
                </div>


            </div>



        </div>



    );
};

export default Login;