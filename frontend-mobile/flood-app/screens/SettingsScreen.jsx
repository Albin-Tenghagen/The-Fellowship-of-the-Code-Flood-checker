import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useTheme } from '../themes/ThemeContext';
import { uploadMockLocations, uploadMockMonitoringEntries, getMonitoringEntries } from "../services/firebaseUtils";

const SettingsScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [monitoringData, setMonitoringData] = useState([]);

  const handleGetMonitoringData = async () => {
    try {
      const data = await getMonitoringEntries();
      setMonitoringData(data);
      console.log("Monitoring entries:", data);
    } catch (error) {
      console.error("Fel vid hämtning:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => uploadMockLocations()}>
          <Text style={styles.buttonText}>Ladda upp mock-data (locations)</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => uploadMockMonitoringEntries()}>
          <Text style={styles.buttonText}>Ladda upp mock-monitoring</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleGetMonitoringData}>
          <Text style={styles.buttonText}>Hämta monitoring-data</Text>
        </Pressable>
        {monitoringData.map((item, index) => (
          <View key={item.id || index} style={{ marginVertical: 8 }}>
            <Text style={{ color: theme.textPrimary }}>
              {item.timestamp} – {item.temperature}°C – {item.ultraSoundLevel}cm
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
export default SettingsScreen;


const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      padding: 16,
    },
    button: {
      marginTop: 10,
      backgroundColor: theme.card || '#007AFF',
      padding: 12,
      borderRadius: 8,
    },

  });