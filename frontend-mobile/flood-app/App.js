import { ThemeProvider } from './themes/ThemeContext';
import Navigation from './navigation/Navigation';
import { DataProvider } from './context/DataContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';


export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <DataProvider>
            <Navigation />
          </DataProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}