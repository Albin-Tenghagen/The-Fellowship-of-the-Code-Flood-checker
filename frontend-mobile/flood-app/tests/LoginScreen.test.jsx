import LoginScreen from "../screens/LoginScreen";
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from "../themes/ThemeContext";
import { AuthProvider } from "../context/AuthContext";


const mockNavigate = jest.fn();

jest.mock("../services/api", () => ({
    loginWithFirebase: jest.fn(() => 
        Promise.resolve({
            access_token: "fake-tokem"
        })
    )

}));

const renderWithProviders = () => {
    return render(
        <ThemeProvider>
            <AuthProvider>
                <LoginScreen navigation={{ navigate: mockNavigate }}/>
            </AuthProvider>
        </ThemeProvider>

    )
};

describe("LoginScreen", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    //renderar komponent?
    it ("renderar komponente korrekt", () => {
        const {getAllByLabel} = renderWithProviders();
        expect (getAllByLabel('email-adress')).toBeTruthy();
        expect (getAllByLabel('Lösenord')).toBeTruthy();
        expect (getAllByLabel('Logga in knapp')).toBeTruthy();
    });

    //Funkar felmeddelande?

    it("visar felmedelande om fält är tomma", async () => {
        const { getByTestId, getByText} = renderWithProviders();

        fireEvent.changeText(getByTestId('email-input'), "");
        fireEvent.changeText(getByTestId('password-input'), "");

        fireEvent.press(getByTestId('login-button'));

        await waitFor(() => {
            expect (getByText("Fyll i e-post och lösenord")).toBeTruthy();
        });

    });


    //Funkar success-meddelandet?

    it("visar meddelande vid lyckad inloggning", async () => {
        const { getByTestId, getByText} = renderWithProviders();

        fireEvent.changeText(getByTestId('email-input'), "janne@kommunhuset.se");
        fireEvent.changeText(getByTestId('password-input'), "janne57");

        fireEvent.press(getByTestId('login-button'));

        await waitFor(() => {
            expect (getByText("Inloggningen lyckades")).toBeTruthy();
        });      
    });
});