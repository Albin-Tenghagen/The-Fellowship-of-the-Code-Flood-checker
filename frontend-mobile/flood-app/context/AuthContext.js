import React, { createContext, useContext, useEffect, useState} from 'react'
import { saveToStorage, getFromStorage, deleteFromStorage } from "../services/webCompatibleSecureStore"

const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await getFromStorage("userToken")
            if (storedToken) {
                setToken(storedToken);
            }
            setIsLoading(false);
        };
        loadToken();
    }, []);

    const login = async (fakeToken) => {
        await saveToStorage("userToken", fakeToken);
        setToken(fakeToken);
        console.log(fakeToken);
    };

    const logout = async () => {
        await deleteFromStorage("userToken");
        setToken(null);
    }
    
    return (
        <AuthContext.Provider value={{ token, login, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);