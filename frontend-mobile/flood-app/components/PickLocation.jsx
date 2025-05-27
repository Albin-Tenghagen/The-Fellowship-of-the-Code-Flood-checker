import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../themes/ThemeContext';
import FlatListLocation from './FlatListLocation';
import { fetchSafety } from '../services/api';

const { width: screenWidth } = Dimensions.get('window');

// Mock data for fallback
const mockLocationData = [
  {
    id: 1,
    location: "Göta älv - Göteborg",
    waterlevel: 8,
    priority: "critical",
    description: "Kritisk vattennivå vid centrala Göteborg",
    coordinates: "57.7089, 11.9746"
  },
  {
    id: 2,
    location: "Motala ström - Norrköping",
    waterlevel: 6,
    priority: "high",
    description: "Förhöjd vattennivå i industriområdet",
    coordinates: "58.5877, 16.1924"
  },
  {
    id: 3,
    location: "Dalälven - Gävle",
    waterlevel: 9,
    priority: "critical",
    description: "Mycket hög vattennivå - översvämningsrisk",
    coordinates: "60.6749, 17.1413"
  },
  {
    id: 4,
    location: "Klarälven - Karlstad",
    waterlevel: 4,
    priority: "medium",
    description: "Normala nivåer men kräver övervakning",
    coordinates: "59.3793, 13.5036"
  },
  {
    id: 5,
    location: "Lule älv - Luleå",
    waterlevel: 7,
    priority: "high",
    description: "Stigande vattennivåer vid kraftverket",
    coordinates: "65.5841, 22.1547"
  },
  {
    id: 6,
    location: "Fyrisån - Uppsala",
    waterlevel: 3,
    priority: "low",
    description: "Låga vattennivåer, ingen omedelbar risk",
    coordinates: "59.8586, 17.6389"
  }
];

const USE_MOCK_DATA = true; // Set to false to use real API

const PickLocation = ({ navigation }) => {
  const { theme } = useTheme();
  const [safety, setSafety] = useState([]);
  const [loading, setLoading] = useState(true);
  const styles = createStyles(theme);

  useEffect(() => {
    const getSafety = async () => {
      try {
        setLoading(true);
        if (USE_MOCK_DATA) {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          setSafety(mockLocationData);
          console.log('🧪 Using mock safety data in PickLocation');
        } else {
          const safetyData = await fetchSafety();
          setSafety(safetyData);
          console.log('Safety data loaded:', safetyData);
        }
      } catch (error) {
        console.error('Kunde inte hämta säkerhetsdata:', error);
        // Fallback to mock data on error
        console.log('📦 Falling back to mock data due to error');
        setSafety(mockLocationData);
      } finally {
        setLoading(false);
      }
    };

    getSafety();
  }, []);

  const handleLocationSelect = (selectedLocation) => {
    console.log('📍 Location selected:', selectedLocation);
    navigation.navigate('WorkerStatus', {
      location: selectedLocation,
      safetyData: safety,
      resetStatus: true
    });
  };

  return (
    <View style={styles.container}>
      {/* Location List - FlatListLocation handles its own header */}
      <FlatListLocation
        onButtonPress={handleLocationSelect}  // Changed from onLocationSelect to onButtonPress
        safetyData={safety}
        loading={loading}
      />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
});

export default PickLocation;