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
    if (!tipText.trim()) {
      Alert.alert('Fel', 'Vänligen ange en beskrivning av tipset');
      return;
    }
    
    if (!location.trim()) {
      Alert.alert('Fel', 'Vänligen ange en plats');
      return;
    }
    
    try {
      setLoading(true);
      
      const tipData = {
        description: tipText.trim(),
        location: location.trim(),
        timestamp: new Date().toISOString(),
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

      const errorMessage = error.message || 'Kunde inte skicka tipset. Vänligen försök igen.';
      
      Alert.alert('Fel', errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
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
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
          placeholder="Ange plats"
          placeholderTextColor={theme.textPrimary}
          value={location}
          onChangeText={setLocation}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: textColor || theme.textPrimary }]}>Beskrivning</Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
          placeholder="Beskriv ditt tips här..."
          placeholderTextColor={theme.textSecondary}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={tipText}
          onChangeText={setTipText}
        />
      </View>
      
      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: theme.primary }]}
        onPress={handleSubmitTip}
        disabled={loading}
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