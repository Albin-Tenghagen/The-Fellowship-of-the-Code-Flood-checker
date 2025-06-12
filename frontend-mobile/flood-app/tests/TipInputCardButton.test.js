import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TipInputCard from '../components/TipInputCard';
import { ThemeProvider } from '../themes/ThemeContext';
import * as firebaseUtils from '../services/firebaseUtils';
import { Alert } from 'react-native';

jest.mock('../services/firebaseUtils', () => ({
  postUserTip: jest.fn(() => Promise.resolve()),
}));

jest.spyOn(Alert, 'alert');

describe('TipInputCard - Button Behavior', () => {
  it('enables the button and shows loading indicator when submitting', async () => {
    const { getByPlaceholderText, getByText, queryByTestId } = render(
      <ThemeProvider>
        <TipInputCard />
      </ThemeProvider>
    );

    fireEvent.changeText(getByPlaceholderText('Ange plats'), 'Uppsala');
    fireEvent.changeText(getByPlaceholderText('Beskriv ditt tips här...'), 'Regn och översvämning');

    const button = getByText('Skicka in');
    expect(button.props.accessibilityState?.disabled).toBeFalsy();

    fireEvent.press(button);

    await waitFor(() => {
      const spinner = queryByTestId('ActivityIndicator');
      expect(spinner).toBeTruthy();
    });

    await waitFor(() => {
      expect(firebaseUtils.postUserTip).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith(
        'Framgång',
        'Tack för ditt tips! Det har skickats till vårt system.'
      );
    });
  });
});
