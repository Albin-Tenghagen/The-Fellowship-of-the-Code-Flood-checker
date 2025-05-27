import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTheme } from "../themes/ThemeContext"
import AnimatedButton from '../components/AnimatedButton';
import { useAuth } from '../context/AuthContext';
import PickLocation from '../components/PickLocation'
import { fetchMonitoring } from '../services/api'

const UserScreen = () => {
  const { theme } = useTheme();
  // const [weatherData, setWeatherData] = useState({
  //   temperature: null,
  //   humidity: null,
  //   airPressure: null,
  //   soilMoisture: null,
  //   ultraSoundLevel: null,
  //   pressureLevel: null
  // });
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getMonitoringData = async () => {
  //     try {
  //       setLoading(true);
  //       console.log("Fetching monitoring data...");

  //       const monitoringData = await fetchMonitoring();
  //       console.log("Monitoring data fetched successfully, entries:", monitoringData.length);

  //       if (monitoringData && monitoringData.length > 0) {
  //         const latestData = monitoringData[monitoringData.length - 1];

  //         console.log("Using latest monitoring data:", latestData);

  //         setWeatherData({
  //           temperature: latestData.temperature,
  //           humidity: latestData.humidity,
  //           airPressure: latestData.airPressure,
  //           soilMoisture: latestData.soilMoisture,
  //           ultraSoundLevel: latestData.ultraSoundLevel,
  //           pressureLevel: latestData.pressureLevel
  //         });
  //       } else {
  //         console.warn("No monitoring data available");
  //       }
  //     } catch (error) {
  //       console.error('Error fetching monitoring data:', error);
  //       Alert.alert(
  //         "Data Loading Error",
  //         "Could not load monitoring data. Please try again later.",
  //         [{ text: "OK" }]
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getMonitoringData();

  //   const intervalId = setInterval(getMonitoringData, 5 * 60 * 1000);
  //   return () => clearInterval(intervalId);
  // }, []);

  const { logout } = useAuth();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <AnimatedButton style={styles.button} title="Logga ut" onPress={logout} />
      <View style={styles.statusContainer}>
        <PickLocation />
      </View>
    </ScrollView>
  );
};
export default UserScreen
const styles = StyleSheet.create({

  scroll: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  statusContainer: {
    // zIndex: 1,
  },
  mapContainer: {
    flex: 1,
  }
})

