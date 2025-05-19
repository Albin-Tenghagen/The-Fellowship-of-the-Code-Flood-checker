import { ThemeProvider } from './themes/ThemeContext';
import Navigation from './navigation/Navigation';
import { DataProvider } from './context/DataContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';


export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AuthProvider>
          <DataProvider>
            <Navigation />
          </DataProvider>
        </AuthProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

const BASE_URL = "https://api.escuelajs.co/api/v1";

export const loginWithApi = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) throw new Error("Inloggningen misslyckades");

        return await response.json(); // Innehåller tokens
    } catch(error) {
        console.error("Login error", error);
        return null;
    }
};


export const fetchUserProfile = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/profile`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error("Kunde inte hämta profil");

        return await response.json();
    } catch (error) {
        console.log("Fetch user error", error);
        return null;
    }
}
