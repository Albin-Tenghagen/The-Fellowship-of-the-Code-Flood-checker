import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../themes/ThemeContext';
import FlatListLocation from './FlatListLocation';
import SelectedLocationCard from './SelectedLocationCard';
import WorkerStatus from './WorkerStatus';

const PickLocation = () => {
  const { theme } = useTheme();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setIsConfirmed(false);
  };
  const handleConfirm = () => {
    setIsConfirmed(true);
  };
  const handleBack = () => {
    setSelectedLocation(null);
    setIsConfirmed(false);
  };

  if (!selectedLocation) {
    return (
      <View style={[styles.instructionContainer, { backgroundColor: theme.backgroundTertiary }]}>
        <View style={styles.instructionContent}>
          <MaterialIcons name="info-outline" size={20} color={theme.primary} />
          <Text style={[styles.instructionText, { color: theme.textPrimary }]}>
            Tryck på en plats för att läsa om situationen på plats
          </Text>
        </View>
        <FlatListLocation onSend={handleLocationSelect} />
      </View>
    );
  }
  if (!isConfirmed) {
    return (
      <SelectedLocationCard
        location={selectedLocation}
        onConfirm={handleConfirm}
        onBack={handleBack}
      />
    );
  }
  return <WorkerStatus location={selectedLocation} />;
};
const styles = StyleSheet.create({
  instructionContainer: {
    marginTop: 0,
    padding: 5,
    borderRadius: 12,
    flexDirection: 'column',
  },
  instructionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 13,
    lineHeight: 20,
    marginLeft: 15,
    flex: 1,
    fontWeight: '500',
  },
});
export default PickLocation;