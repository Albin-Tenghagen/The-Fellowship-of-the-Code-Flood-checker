import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTheme } from "../themes/ThemeContext"
import WorkerStatus from '../components/WorkerStatus'
import InfrastructureIssuesCard from '../components/InfrastructureIssuesCard'
import WaterLevelCard from '../components/WaterLevelCard'
import { fetchMonitoring } from '../services/api'

const UserScreen = () => {
  const { theme } = useTheme();
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    humidity: null,
    airPressure: null,
    soilMoisture: null,
    ultraSoundLevel: null,
    pressureLevel: null
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getMonitoringData = async () => {
      try {
        setLoading(true);
        console.log("Fetching monitoring data...");
        
        const monitoringData = await fetchMonitoring();
        console.log("Monitoring data fetched successfully, entries:", monitoringData.length);
        
        if (monitoringData && monitoringData.length > 0) {
          const latestData = monitoringData[monitoringData.length - 1];
          
          console.log("Using latest monitoring data:", latestData);
          
          setWeatherData({
            temperature: latestData.temperature,
            humidity: latestData.humidity,
            airPressure: latestData.airPressure,
            soilMoisture: latestData.soilMoisture,
            ultraSoundLevel: latestData.ultraSoundLevel,
            pressureLevel: latestData.pressureLevel
          });
        } else {
          console.warn("No monitoring data available");
        }
      } catch (error) {
        console.error('Error fetching monitoring data:', error);
        Alert.alert(
          "Data Loading Error", 
          "Could not load monitoring data. Please try again later.",
          [{ text: "OK" }]
        );
      } finally {
        setLoading(false);
      }
    };
    
    getMonitoringData();
    
    const intervalId = setInterval(getMonitoringData, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.statusContainer}>
          <WorkerStatus />
        </View>
        
        <InfrastructureIssuesCard
          title="Aktuella problem"
          width="90%"
          maxItems={1}
        />

        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          Nuvarande vattenövervakning
        </Text>

        <View style={styles.cardContainer}>
          <WaterLevelCard
            title="Vattennivå"
            parameter="ultraSoundLevel"
            width="45%"
            icon="water"
            loading={loading}
            value={weatherData.ultraSoundLevel}
          />
          <WaterLevelCard
            title="Trycknivå"
            parameter="pressureLevel"
            width="45%"
            icon="gauge"
            loading={loading}
            value={weatherData.pressureLevel}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          Väderförhållanden
        </Text>

        <View style={styles.cardContainer}>
          <WaterLevelCard
            title="Temperatur"
            parameter="temperature"
            width="45%"
            icon="thermometer"
            loading={loading}
            value={weatherData.temperature}
          />
          <WaterLevelCard
            title="Luftfuktighet"
            parameter="humidity"
            width="45%"
            icon="water-percent"
            loading={loading}
            value={weatherData.humidity}
          />
        </View>

        <View style={styles.cardContainer}>
          <WaterLevelCard
            title="Lufttryck"
            parameter="airPressure"
            width="45%"
            icon="weather-windy"
            loading={loading}
            value={weatherData.airPressure}
          />
          <WaterLevelCard
            title="Jordfuktighet"
            parameter="soilMoisture"
            width="45%"
            icon="water-percent"
            loading={loading}
            value={weatherData.soilMoisture}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default UserScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  statusContainer: {
    zIndex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
})