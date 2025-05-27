import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useTheme } from '../themes/ThemeContext';
import { uploadMockLocations, uploadMockMonitoringEntries } from "../services/firebaseUtils";

const SettingsScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => uploadMockLocations()}>
          <Text style={styles.buttonText}>Ladda upp mock-data (locations)</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => uploadMockMonitoringEntries()}>
          <Text style={styles.buttonText}>Ladda upp mock-monitoring</Text>
        </Pressable>
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