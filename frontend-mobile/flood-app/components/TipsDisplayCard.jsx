import { StyleSheet, View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { fetchTips } from '../services/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TipsDisplayCard = ({
  title = 'Senaste tipsen',
  width = '90%',
  maxItems = 5,
  refresh = false,
  textColor = null,
  iconColor = null, // Changed from icon to iconColor for clarity
  // Add these additional color props for consistency with other components
  titleColor = null,
  secondaryTextColor = null,
  userTextColor = null,
  borderColor = null,
}) => {
  const { theme } = useTheme();
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadTips = async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      console.log('Fetching tips...');
      const data = await fetchTips();
      console.log('Got tips:', data);

      const sortedTips = data
        .sort((a, b) => {
          try {
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);
            return dateB - dateA;
          } catch (err) {
            return b.timestamp.localeCompare(a.timestamp);
          }
        })
        .slice(0, maxItems);

      setTips(sortedTips);
    } catch (err) {
      console.error('Error fetching tips:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTips();
  }, [maxItems, refresh]);

  const onRefresh = () => {
    loadTips(true);
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    return timestamp;
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.card },
        width ? { width } : {},
      ]}
    >
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="message-text-outline"
          size={24}
          color={iconColor || theme.primary}
          style={{ marginRight: 8 }}
        />
        <Text style={[styles.title, { color: titleColor || theme.textPrimary }]}>
          {title}
        </Text>
      </View>

      {loading && !refreshing ? (
        <ActivityIndicator size="small" color={iconColor || theme.primary} style={styles.loader} />
      ) : error ? (
        <Text style={[styles.errorText, { color: 'red' }]}>
          Error: {error}
        </Text>
      ) : tips.length === 0 ? (
        <Text style={[styles.emptyText, { color: secondaryTextColor || theme.textSecondary }]}>
          Inga tips tillgängliga
        </Text>
      ) : (
        <ScrollView
          style={styles.tipsContainer}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              colors={[iconColor || theme.primary]}
            />
          }
        >
          {tips.map((tip) => (
            <View key={tip.id} style={[
              styles.tipItem,
              { borderBottomColor: borderColor || '#eee' }
            ]}>
              <Text style={[styles.tipLocation, { color: textColor || theme.textPrimary }]}>
                {tip.location}
              </Text>
              <Text style={[styles.tipDescription, { color: textColor || theme.textPrimary }]}>
                {tip.description}
              </Text>
              <View style={styles.tipFooter}>
                <Text style={[styles.tipTimestamp, { color: secondaryTextColor || theme.textSecondary }]}>
                  {formatTimestamp(tip.timestamp)}
                </Text>
                {tip.user && (
                  <Text style={[styles.tipUser, { color: userTextColor || theme.primary }]}>
                    - {tip.user}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TipsDisplayCard;

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
    marginBottom: 16,
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
  tipsContainer: {
    maxHeight: 300,
  },
  tipItem: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // This will be overridden in the component
  },
  tipLocation: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  tipFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipTimestamp: {
    fontSize: 12,
    marginRight: 6,
  },
  tipUser: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});