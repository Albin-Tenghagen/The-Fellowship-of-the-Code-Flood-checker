import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getLocationsWithWaterLevel } from '../services/firebaseUtils';
import CheckBox from './CheckBox';

import { useTheme } from '../themes/ThemeContext';

const FlatListLocation = ({ onSend }) => {
  if (!onSend) {
    console.warn("Prop 'onLocationSelect' saknas i FlatListLocation");
  }
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocationsWithWaterLevel();
        setLocations(data);
      } catch (error) {
        console.error("Fel vid hämtning från Firebase:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const onSelect = (id) => {
    setSelectedId(id);
    const chosen = locations.find(loc => loc.id === id);
    if (chosen) {
      console.log("Vald plats:", chosen);
      onSend(chosen);
    }
  };

  const renderItem = ({ item }) => (
    <CheckBox
      id={item.id}
      title={`${item.location} (${item.waterlevel} cm)`}
      isChecked={selectedId === item.id}
      onPress={() => onSelect(item.id)}
    />
  );

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