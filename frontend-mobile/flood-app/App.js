import { ThemeProvider } from './themes/ThemeContext';
import Navigation from './navigation/Navigation';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import { TipsProvider } from './context/TipsContext';

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AuthProvider>
          <TipsProvider>
            <Navigation />
          </TipsProvider>
        </AuthProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

