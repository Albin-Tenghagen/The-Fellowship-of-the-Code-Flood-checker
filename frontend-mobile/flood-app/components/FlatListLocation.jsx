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
  const styles = createStyles(theme);
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
            "id": 1001,
            "timestamp": "18/4-25",
            "location": "Nordvästra Eslöv",
            "description": "Mätstation vid västra Asmundtorp har mätt ett förhöjt vattenstånd med ${waterlevel}",
            "proactiveActions": {
              "basementProtection": "Boende i Asmundtorp bör hålla uppsikt. så vatten ej tränger in i källare. Vattennivån är aningen riskfylld",
              "trenchDigging": "Ej nödvändigt i nuläget",
              "electricHazards": "Kolla trädgården efter elektriska saker "
            }
          },
          {
            "id": 1002,
            "timestamp": "11/4-25",
            "location": "Haparanda",
            "description": "Mätstation vid östra Asmundtorp har mätt ett förhöjt vattenstånd med ${waterlevel}",
            "proactiveActions": {
              "basementProtection": "Boende i Asmundtorp bör hålla uppsikt. så vatten ej tränger in i källare. Vattennivån är aningen riskfylld",
              "trenchDigging": "Ej nödvändigt i nuläget",
              "electricHazards": "Kolla trädgården efter elektriska saker "
            }
          },
          {
            "id": 1003,
            "timestamp": "2025-04-21 08:40:23.682",
            "location": "SydÖstra eslöv",
            "description": "vatten upp till knäna inte bra alls",
            "proactiveActions": {
              "basementProtection": "Är en bra idé, Lägg påsar med sand vid glippor och dylikt"
            }
          },
          {
            "id": 1004,
            "timestamp": "2025-04-21 10:44:49 undefined",
            "location": "SydÖstra eslöv",
            "description": "vatten upp till knäna inte bra alls",
            "proactiveActions": {
              "basementProtection": "kattsand är absorberande"
            }
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
        title="Välj plats"
        onPress={handleButtonPress}
      />
    </SafeAreaView>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor || '#fff',
      marginTop: StatusBar.currentHeight || 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: '95%',
      height: '100%',
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
      // paddingBottom: 20,
    },
    button: {
      marginTop: 20,
      backgroundColor: theme.primaryColor || '#007AFF',
      padding: 12,
      borderRadius: 8,
    },
  });


export default FlatListLocation;