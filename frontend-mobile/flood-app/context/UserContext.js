import { Text, View } from 'react-native'
import React, { createContext, useContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';



const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const storedUser = await AsyncStorage.getItem("userProfile");
            if (storedUser) setUser(storedUser);
            setIsLoading(false);
        };
        load();
    }, []);

    const saveUserData = async (userData) => {
        setUser(userData);
        await AsyncStorage.setItem("userProfile", JSON.stringify(userData));
    };

    const clearUser = async () => {
        setUser(null);
        await AsyncStorage.removeItem("userProfile");
    }

    return (
        <UserContext.Provider value={{user, isLoading, saveUserData, clearUser}}>
            {children}
        </UserContext.Provider>
    )
};

export const useUser = () => useContext(UserContext);