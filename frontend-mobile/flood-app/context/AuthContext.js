import React, { createContext, useContext, useEffect, useState } from 'react'
import { saveToStorage, getFromStorage, deleteFromStorage } from "../services/webCompatibleSecureStore"
import { fetchUserProfile } from '../services/api';
import { useUser } from './UserContext';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { saveUserData, clearUser } = useUser();

    // useEffect(() => {
    //     const loadToken = async () => {
    //         const storedToken = await getFromStorage("userToken")
    //         if (storedToken) {
    //             setToken(storedToken);
    //             const profile = await fetchUserProfile(storedToken);
    //             if (profile) {
    //                 saveUserData(profile)
    //             }
    //         }
    //         setIsLoading(false);
    //     };
    //     loadToken();
    // }, []);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                setToken(token);
                await saveToStorage("userToken", token);

                const profile = {
                    id: user.uid,
                    email: user.email,
                    name: user.displayName || "John",
                    avatar: user.photoURL || "https://i.imgur.com/LDOO4Qs.jpg"
                };

                saveUserData(profile);
            } else {
                setToken(null);
                await deleteFromStorage("userToken");
                clearUser();
            }

            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);


    const login = async (newToken) => {
        await saveToStorage("userToken", newToken);
        setToken(newToken);

        const currentUser = auth.currentUser;
        if (currentUser) {
            const profile = {
                id: currentUser.uid,
                email: currentUser.email,
                name: currentUser.displayName || "John",
                avatar: currentUser.photoURL || "https://i.imgur.com/LDOO4Qs.jpg"
            };
            saveUserData(profile);
        }
    };

    const logout = async () => {
        await deleteFromStorage("userToken");
        setToken(null);
        clearUser();
        await signOut(auth);
    }

    return (
        <AuthContext.Provider value={{ token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);
