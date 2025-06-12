import { render } from '@testing-library/react-native';
import TipInputCard from '../components/TipInputCard'; 
import { ThemeProvider } from '../themes/ThemeContext'; 

describe('TipInputCard', () => {
  it('renders title and input fields', () => {
    const { getByText, getByPlaceholderText } = render(
      <ThemeProvider>
        <TipInputCard />
      </ThemeProvider>
    );

    expect(getByText('Skicka in tips')).toBeTruthy();
    expect(getByPlaceholderText('Ange ditt namn')).toBeTruthy();
    expect(getByPlaceholderText('Ange plats')).toBeTruthy();
    expect(getByPlaceholderText('Beskriv ditt tips här...')).toBeTruthy();
    expect(getByText('Skicka in')).toBeTruthy();
  });
});

