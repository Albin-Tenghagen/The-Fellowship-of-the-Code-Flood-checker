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
        const response = await fetch('http://localhost:5001/users/safety');
        const json = await response.json();

        const withWaterLevels = json.products.map(item => ({
          ...item,
          waterlevel: Math.floor(Math.random() * 10),
        }));

        withWaterLevels.sort((a, b) => b.waterlevel - a.waterlevel);

        setLocations(withWaterLevels);
      } catch (error) {
        console.error('Fel vid API-anrop:', error);
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
        <Text>Laddar...</Text>
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
        title="Påbörja arbete"
        onPress={handleButtonPress}
      />
    </SafeAreaView>
  );
};

export default FlatListLocation;


const createStyles = (theme) =>
  StyleSheet.create({
    box: {
      marginTop: 10,

    },

    container: {
      flex: 1,
      backgroundColor: theme.card,
      marginTop: StatusBar.currentHeight || 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: '95%',
      height: '100%',
      borderRadius: 8,
      margin: 8,
      paddingVertical: 30,
    },
    font: {
      fontSize: 35,
      color: theme.textTertiary,
      marginBottom: 35,
    },
   
  });
