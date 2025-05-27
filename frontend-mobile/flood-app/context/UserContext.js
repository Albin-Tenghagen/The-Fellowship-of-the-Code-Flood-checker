import { Text, View } from 'react-native'
import React, { createContext, useContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';



const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const storedUser = await AsyncStorage.getItem("userName");
            if (storedUser) setUserName(storedUser);
            setIsLoading(false);
        };
        load();
    }, []);

    const saveUserName = async (name) => {
        setUserName(name);
        await AsyncStorage.setItem("userName", name);
    };

    const clearUser = async () => {
        setUserName("");
        await AsyncStorage.removeItem("userName");
    }

    return (
        <UserContext.Provider value={{userName, isLoading, saveUserName, clearUser}}>
            {children}
        </UserContext.Provider>
    )
};

export const useUser = () => useContext(UserContext);