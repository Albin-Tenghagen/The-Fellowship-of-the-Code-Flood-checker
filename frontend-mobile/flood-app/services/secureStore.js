import * as SecureStore from "expo-secure-store"

export const saveToSecureStore = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        console.error("Gick ej att spara till SecureStore", error)
    }
};

export const getFromSecureSore = async (key) => {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.error("Gick ej att hämta från SecureStore", error);
        return null;
    }
};

export const deleteFromSecureStore = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.error("Gick ej att tanbort från SecureStore", error);
    }
};