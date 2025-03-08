import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import auth from "../Firebase/firebase.config";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };


    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // save users data
    const saveUser = async (user) => {
        const currentUser = {
            image: user?.photoURL,
            name: user?.displayName,
            email: user?.email,
            status: "Verified",
            role: 'guest'
        };

        const { data } = await axios.put(`${import.meta.env.VITE_SERVER_URL}/usersData`, currentUser);
        return data;
    };




    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('Current User', currentUser);
            if (currentUser) {
                saveUser(currentUser);
            }
            setLoading(false);
        });

        return () => {
            return unsubscribe();
        };

    }, []);


    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };



    const authInfo = {
        user, loading, setLoading, createUser, login, signInWithGoogle, logOut,
        // saveUser
    };



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;