import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchSafety } from '../services/api';
import FlatListLocation from '../components/FlatListLocation';

const SettingsScreen = () => {
  const [safety, setSafety] = useState([]);
  const [safetyError, setSafetyError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    console.log("Plats:", location);
  };

  useEffect(() => {
    const getSafety = async () => {
      try {
        const safetyData = await fetchSafety();
        setSafety(safetyData);
      } catch (error) {
        setSafetyError(error.message);
      }
    };
    getSafety();
  }, []);
  return (
    <ScrollView>
    <View style={styles.container}>
    
      <FlatListLocation onSend={ handleLocationSelect }/>

        {selectedLocation && (
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 18 }}>Vald plats:</Text>
          <Text> Plats: {selectedLocation.location}</Text>
          <Text>Vattennivå: {selectedLocation.waterlevel} cm</Text>
          <Text>Tidpunkt: {selectedLocation.timestamp} </Text>
          <Text>Beskrivning: {selectedLocation.description} </Text>

          {selectedLocation.proactiveActions && (
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Förebyggande åtgärder:</Text>
              {selectedLocation.proactiveActions.basementProtection && (
                <Text>• Källarskydd: {selectedLocation.proactiveActions.basementProtection}</Text>
              )}
              {selectedLocation.proactiveActions.trenchDigging && (
                <Text>• Grävning: {selectedLocation.proactiveActions.trenchDigging}</Text>
              )}
              {selectedLocation.proactiveActions.electricHazards && (
               <Text>• Elrisker: {selectedLocation.proactiveActions.electricHazards}</Text>
              )}
            </View>
          )}
        </View>
      )}
      {safety.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.description}>{item.description}</Text>
          {item.proactiveActions && (
            <View style={styles.actions}>
              <Text style={styles.actionsHeader}>Förebyggande åtgärder:</Text>
              {item.proactiveActions.basementProtection && (
                <Text>• Källarskydd: {item.proactiveActions.basementProtection}</Text>
              )}
              {item.proactiveActions.trenchDigging && (
                <Text>• Grävning: {item.proactiveActions.trenchDigging}</Text>
              )}
              {item.proactiveActions.electricHazards && (
                <Text>• Elrisker: {item.proactiveActions.electricHazards}</Text>
              )}
            </View>
          )}
        </View>
      ))}
      {safetyError && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>:warning: Kunde inte hämta tips: {safetyError}</Text>
        </View>
      )}
    </View>
    </ScrollView>
  );
};
export default SettingsScreen;
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
  },
  location: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    marginTop: 4,
    fontSize: 14,
  },
  actions: {
    marginTop: 10,
  },
  actionsHeader: {
    fontStyle: 'italic',
    marginBottom: 4,
  },
  errorBox: {
    padding: 10,
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
  },
});