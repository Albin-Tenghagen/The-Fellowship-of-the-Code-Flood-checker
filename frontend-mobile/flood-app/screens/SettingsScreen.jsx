import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useTheme } from '../themes/ThemeContext';
import {
  uploadMockLocations,
  uploadMockMonitoringEntries,
  getMonitoringEntries,
  uploadMockInfrastructure,
  getInfrastructureIssues,
  uploadMockUserTips,
  getUserTips
} from "../services/firebaseUtils";

const SettingsScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [monitoringData, setMonitoringData] = useState([]);
  const [infrastructureData, setInfrastructureData] = useState([]);
  const [userTips, setUserTips] = useState([]);

  const handleGetMonitoringData = async () => {
    try {
      const data = await getMonitoringEntries();
      setMonitoringData(data);
      console.log("Monitoring entries:", data);
    } catch (error) {
      console.error("Fel vid hämtning:", error);
    }
  };

  const handleGetInfrastructureData = async () => {
    try {
      const data = await getInfrastructureIssues();
      setInfrastructureData(data);
      console.log("Infrastructure data:", data);
    } catch (error) {
      console.error("Fel vid hämtning av infrastrukturproblem:", error);
    }
  };

  const handleGetUserTips = async () => {
    try {
      const data = await getUserTips();
      setUserTips(data);
      console.log("Tips:", data);
    } catch (error) {
      console.error("Fel vid hämtning av tips:", error);
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
        <Pressable style={styles.button} onPress={() => uploadMockInfrastructure()}>
          <Text style={styles.buttonText}>Ladda upp mock-infrastruktur</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleGetInfrastructureData}>
          <Text style={styles.buttonText}>Hämta infrastructure-data</Text>
        </Pressable>
        {infrastructureData.map((item, index) => (
          <View key={item.id || index} style={{ marginVertical: 8 }}>
            <Text style={{ color: theme.textPrimary }}>
              {item.timestamp} – {item.problem}
            </Text>
          </View>
        ))}
        <Pressable style={styles.button} onPress={() => uploadMockUserTips()}>
          <Text style={styles.buttonText}>Ladda upp mock-tips</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleGetUserTips}>
          <Text style={styles.buttonText}>Hämta tips</Text>
        </Pressable>

        {userTips.map((tip, index) => (
          <View key={index} style={{ marginVertical: 8 }}>
            <Text style={{ color: theme.textPrimary }}>
              {tip.timestamp} – {tip.user} ({tip.location}): {tip.description}
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