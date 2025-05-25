import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { fetchMonitoring } from '../services/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MonitoringCard = ({
  title = 'Sensorvärden',
  width = '90%',
  titleColor = null,
  backgroundColor = null,
  errorColor = null,
  emptyTextColor = null,
}) => {
  const { theme } = useTheme();
  const [latestData, setLatestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMonitoring = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMonitoring();

        if (!data || data.length === 0) {
          setLatestData(null);
        } else {
          const latest = data[0];

          // ✅ Map backend keys to frontend-friendly names
          setLatestData({
            temperature: latest.temperature_c,
            humidity: latest.humidity_percent,
            soilMoisture: latest.soil_moisture_percent,
            pressureLevel: latest.water_level_pressure_cm,
            ultraSoundLevel: latest.water_level_ultrasound_cm,
            average: latest.water_level_average_cm,
          });
        }
      } catch (err) {
        console.error('Error fetching monitoring data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMonitoring();
  }, []);

  return (
    <View style={[styles.card, { backgroundColor: backgroundColor || theme.card, width }]}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="chart-box-outline"
          size={24}
          color={theme.primary}
          style={{ marginRight: 8 }}
        />
        <Text style={[styles.title, { color: titleColor || theme.textPrimary }]}>
          {title}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="small" color={theme.primary} style={styles.loader} />
      ) : error ? (
        <Text style={[styles.errorText, { color: errorColor || 'red' }]}>Fel: {error}</Text>
      ) : !latestData ? (
        <Text style={[styles.emptyText, { color: emptyTextColor || theme.textSecondary }]}>
          Ingen data tillgänglig
        </Text>
      ) : (
        <ScrollView style={styles.dataContainer}>
          <Text style={[styles.dataText, { color: theme.textPrimary }]}>
            Vattennivå (ultraljud): {latestData.ultraSoundLevel} cm
          </Text>
          <Text style={[styles.dataText, { color: theme.textPrimary }]}>
            Medelvattennivå: {latestData.average} cm
          </Text>
          <Text style={[styles.dataText, { color: theme.textPrimary }]}>
            Temperatur: {latestData.temperature}°C
          </Text>
          <Text style={[styles.dataText, { color: theme.textPrimary }]}>
            Luftfuktighet: {latestData.humidity}%
          </Text>
          <Text style={[styles.dataText, { color: theme.textPrimary }]}>
            Jordfuktighet: {latestData.soilMoisture}%
          </Text>
          <Text style={[styles.dataText, { color: theme.textPrimary }]}>
            Vattennivå (tryck): {latestData.pressureLevel} cm
          </Text>

        </ScrollView>
      )}
    </View>
  );
};

export default MonitoringCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    marginVertical: 12,
    textAlign: 'center',
  },
  emptyText: {
    marginVertical: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  dataContainer: {
    maxHeight: 200,
  },
  dataText: {
    fontSize: 16,
    marginBottom: 8,
  },
});
