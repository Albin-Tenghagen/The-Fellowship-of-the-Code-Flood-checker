import { StyleSheet, View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { postTip } from '../services/api';

const TipInputCard = ({
  title = 'Skicka in tips',
  width = '90%',
  onTipSubmitted = null,
  textColor = null,
}) => {
  const { theme } = useTheme();
  const [tipText, setTipText] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitTip = async () => {
    try {
      setLoading(true);

      const tipData = {
        description: tipText.trim(),
        location: location.trim(),
        timestamp: new Date().toISOString(),
        user: 'Anonym', // Replace with real user if logged in
      };

      console.log('Submitting tip:', tipData);
      await postTip(tipData);

      setTipText('');
      setLocation('');

      if (onTipSubmitted) {
        onTipSubmitted(tipData);
      }

      Alert.alert('Framgång', 'Tack för ditt tips! Det har skickats till vårt system.');
    } catch (error) {
      console.error('Error submitting tip:', error);
      Alert.alert('Fel', error?.message ?? 'Ett okänt fel inträffade.');
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = !tipText.trim() || !location.trim();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.card },
        width ? { width } : {},
      ]}
    >
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="lightbulb-outline"
          size={24}
          color={theme.icon}
          style={{ marginRight: 8 }}
        />
        <Text style={[styles.title, { color: textColor || theme.textPrimary }]}>
          {title}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: textColor || theme.textPrimary }]}>Plats</Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.inputBackground, color: theme.textPrimary },
          ]}
          placeholder="Ange plats"
          placeholderTextColor={theme.textSecondary}
          value={location}
          onChangeText={setLocation}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: textColor || theme.textPrimary }]}>Beskrivning</Text>
        <TextInput
          style={[
            styles.textArea,
            { backgroundColor: theme.inputBackground, color: theme.textPrimary },
          ]}
          placeholder="Beskriv ditt tips här..."
          placeholderTextColor={theme.textSecondary}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={tipText}
          onChangeText={setTipText}
        />
        <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
          {tipText.length}/280 tecken
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.submitButton,
          {
            backgroundColor: isSubmitDisabled || loading ? theme.disabled || '#ccc' : theme.primary,
          },
        ]}
        onPress={handleSubmitTip}
        disabled={loading || isSubmitDisabled}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Skicka in</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TipInputCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 100,
  },
  submitButton: {
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});