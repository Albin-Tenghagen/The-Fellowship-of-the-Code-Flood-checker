import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../themes/ThemeContext';

const TimeStats = ({ startTime, status, getElapsedTime }) => {
  const { theme } = useTheme();

  if (!startTime || status === 'Ej påbörjad') return null;

  return (
    <View style={[styles.timeStats, { backgroundColor: theme.backgroundSecondary }]}>
      <View style={styles.statItem}>
        <Text style={[styles.statLabel, { color: theme.textTertiary }]}>Startad</Text>
        <Text style={[styles.statValue, { color: theme.textTertiary }]}>
          {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>

      {status !== 'På plats' && getElapsedTime() && (
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: theme.textTertiary }]}>Tid aktiv</Text>
          <Text style={[styles.statValue, { color: theme.textTertiary }]}>
            {getElapsedTime()}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  timeStats: {
    flexDirection: 'row',
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default TimeStats;