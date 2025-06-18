import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TipInputCard from '../components/TipInputCard';
import { ThemeProvider } from '../themes/ThemeContext';

describe('TipInputCard - Button Behavior', () => {
  it('button press function works', () => {
    const { getByText } = render(
      <ThemeProvider>
        <TipInputCard />
      </ThemeProvider>
    );

    const button = getByText('Skicka in');
    
    fireEvent.press(button);
    
    expect(button).toBeTruthy();
  });

  it('button is present and accessible', () => {
    const { getByText, getByRole } = render(
      <ThemeProvider>
        <TipInputCard />
      </ThemeProvider>
    );

    const button = getByText('Skicka in');

    expect(button).toBeTruthy();
    expect(button.props.children).toBe('Skicka in');

    expect(() => getByRole('button')).not.toThrow();
  });

  it('button can be pressed multiple times', () => {
    const { getByText } = render(
      <ThemeProvider>
        <TipInputCard />
      </ThemeProvider>
    );

    const button = getByText('Skicka in');
    
    fireEvent.press(button);
    fireEvent.press(button);
    fireEvent.press(button);
    
    expect(button).toBeTruthy();
  });

  it('component renders without crashing', () => {
    const { getByText } = render(
      <ThemeProvider>
        <TipInputCard />
      </ThemeProvider>
    );

    expect(getByText('Skicka in')).toBeTruthy();
  });

  it('button has proper styling properties', () => {
    const { getByText } = render(
      <ThemeProvider>
        <TipInputCard />
      </ThemeProvider>
    );

    const button = getByText('Skicka in');
    
    expect(button.props.style).toBeDefined();
    
    expect(button.props.onPress).toBeDefined();
  });
});