import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from './CheckBox';
import AnimatedButton from './AnimatedButton';
import { useTheme } from '../themes/ThemeContext';

const FlatListLocation = ({ onSend }) => {
  if (!onSend) {
    console.warn("Prop 'onLocationSelect' saknas i FlatListLocation");
  }
  
  const { theme } = useTheme();
  const [locationData, setLocationData] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const getLocations = async () => {
      try {
        console.log('Försöker hämta data från API...');
        const response = await fetch('http://localhost:5001/users/safety');
        const json = await response.json();
        const withWaterLevels = json.products.map(item => ({
          ...item,
          waterlevel: Math.floor(Math.random() * 10),
        }));
        withWaterLevels.sort((a, b) => b.waterlevel - a.waterlevel);
        setLocations(withWaterLevels);
      } catch (error) {
        console.error('API-fel, använder mockdata:', error);
        console.log('🧪 Använder mock location data');
        
        // Mock data - samma som dina sensor logs visar
        const mockLocations = [
          {
            id: 1,
            location: 'Trädgård A',
            description: 'Huvudträdgård med olika sensorer',
            waterlevel: 8,
            sensors: ['temperatur', 'luftfuktighet', 'jordmoisture', 'vattennivå'],
            lastUpdate: '2025-05-26 10:30:15',
            batteryLevel: 87
          },
          {
            id: 2,
            location: 'Växthus B',
            description: 'Växthus med klimatkontroll',
            waterlevel: 6,
            sensors: ['temperatur', 'luftfuktighet', 'ljusnivå'],
            lastUpdate: '2025-05-26 10:28:45',
            batteryLevel: 92
          },
          {
            id: 3,
            location: 'Kompostområde C',
            description: 'Kompostbehållare med temperatursensor',
            waterlevel: 4,
            sensors: ['temperatur', 'lufttryck'],
            lastUpdate: '2025-05-26 10:25:30',
            batteryLevel: 78
          },
          {
            id: 4,
            location: 'Bevattningssystem D',
            description: 'Automatiskt bevattningssystem',
            waterlevel: 9,
            sensors: ['vattentryck', 'flöde', 'jordmoisture'],
            lastUpdate: '2025-05-26 10:32:12',
            batteryLevel: 95
          },
          {
            id: 5,
            location: 'Södra Rabatt E',
            description: 'Blomrabatt i södra delen',
            waterlevel: 3,
            sensors: ['jordmoisture', 'ljusnivå'],
            lastUpdate: '2025-05-26 10:20:18',
            batteryLevel: 65
          }
        ];
        
        // Sortera efter vattennivå (högst först)
        mockLocations.sort((a, b) => b.waterlevel - a.waterlevel);
        setLocations(mockLocations);
      } finally {
        setLoading(false);
      }
    };
    getLocations();
  }, []);

  const onSelect = (id) => {
    setSelectedId(id);
  };

  const renderItem = ({ item }) => (
    <CheckBox
      id={item.id}
      title={`${item.location} (${item.waterlevel} cm)`}
      isChecked={selectedId === item.id}
      onPress={() => onSelect(item.id)}
    />
  );

  const handleButtonPress = () => {
    if (selectedId) {
      const chosen = locations.find(loc => loc.id === selectedId);
      console.log('Vald plats:', chosen);
      onSend(chosen);
    } else {
      alert('Vänligen välj en plats först!');
    }
  };

  // Create styles using StyleSheet.create and theme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor || '#fff',
      padding: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.backgroundColor || '#fff',
    },
    font: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.textColor || '#000',
      marginBottom: 16,
      textAlign: 'center',
    },
    flatListContainer: {
      paddingBottom: 20,
    },
    button: {
      marginTop: 20,
      backgroundColor: theme.primaryColor || '#007AFF',
      padding: 12,
      borderRadius: 8,
    },
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={{ color: theme.textColor || '#000' }}>Laddar...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.font}>Mätstationer</Text>
      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
      <AnimatedButton
        style={styles.button}
        title="Läs mer"
        onPress={handleButtonPress}
      />
    </SafeAreaView>
  );
};

export default FlatListLocation;