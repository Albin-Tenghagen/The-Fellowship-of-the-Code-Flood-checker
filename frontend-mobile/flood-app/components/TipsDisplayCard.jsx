import { StyleSheet, View, Text, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { fetchTips, deleteTip } from '../services/api';
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
<<<<<<< Updated upstream
=======
  emptyText = 'Inga tips tillgängliga',
  errorTextPrefix = 'Error: ',
  loadingText = null,
  localTips = [],
  useMockData = false,
  locationTextColor = null,
  descriptionTextColor = null,
  timestampTextColor = null,
  showDelete = false,           // New prop to enable/disable delete
  onTipDeleted = null,          // Callback when tip is deleted
>>>>>>> Stashed changes
}) => {
  const { theme } = useTheme();
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingTipId, setDeletingTipId] = useState(null);

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
<<<<<<< Updated upstream

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
=======
      
      // Debug tip structure
      if (data && data.length > 0) {
        console.log('First tip structure:', data[0]);
        console.log('Tip IDs:', data.map(tip => ({ id: tip.id, type: typeof tip.id })));
      }
      
      setApiTips(data || []);
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
  const handleDeleteTip = async (tipId, tipLocation) => {
    // Add debugging
    console.log('Attempting to delete tip:', { tipId, tipLocation, tipIdType: typeof tipId });
    
    Alert.alert(
      'Radera tips',
      `Är du säker på att du vill radera tipset från ${tipLocation}?\n\nTip ID: ${tipId}`,
      [
        {
          text: 'Avbryt',
          style: 'cancel',
        },
        {
          text: 'Radera',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeletingTipId(tipId);
              console.log('Deleting tip with ID:', tipId, 'Type:', typeof tipId);
              
              await deleteTip(tipId);
              
              // Remove from API tips
              setApiTips(prev => prev.filter(tip => tip.id !== tipId));
              
              // Call callback if provided
              if (onTipDeleted) {
                onTipDeleted(tipId);
              }
              
              Alert.alert('Framgång', 'Tipset har raderats');
            } catch (error) {
              console.error('Error deleting tip:', error);
              
              // Show user-friendly error message
              let userMessage = 'Ett okänt fel inträffade';
              
              if (error.message.includes('internet breakdown') || error.message.includes('There was a major internet breakdown')) {
                userMessage = 'Serverproblem: Förbindelseproblem. Försök igen senare.';
              } else if (error.message.includes('not found')) {
                userMessage = 'Tipset kunde inte hittas.';
              } else if (error.message.includes('Server problem')) {
                userMessage = 'Serverproblem. Försök igen senare.';
              }
              
              // For server errors, offer retry option
              if (error.message.includes('internet breakdown') || error.message.includes('Server problem')) {
                Alert.alert(
                  'Serverfel', 
                  userMessage,
                  [
                    { text: 'Avbryt', style: 'cancel' },
                    { 
                      text: 'Försök igen', 
                      onPress: () => handleDeleteTip(tipId, tipLocation)
                    }
                  ]
                );
              } else {
                Alert.alert('Fel', userMessage);
              }
            } finally {
              setDeletingTipId(null);
            }
          },
        },
      ]
    );
  };

  const allTips = [...localTips, ...apiTips];
  const sortedTips = allTips
    .sort((a, b) => {
      try {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return dateB - dateA;
      } catch (err) {
        return b.timestamp?.localeCompare(a.timestamp) || 0;
      }
    })
    .slice(0, maxItems);

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              <Text style={[styles.tipLocation, { color: textColor || theme.textPrimary }]}>
                {tip.location}
              </Text>
              <Text style={[styles.tipDescription, { color: textColor || theme.textPrimary }]}>
                {tip.description}
              </Text>
              <View style={styles.tipFooter}>
                <Text style={[styles.tipTimestamp, { color: secondaryTextColor || theme.textSecondary }]}>
=======
              <View style={styles.tipHeader}>
                <View style={styles.tipContent}>
                  <Text style={[styles.tipLocation, { 
                    color: locationTextColor || textColor 
                  }]}>
                    {tip.location}
                  </Text>
                  <Text style={[styles.tipDescription, { 
                    color: descriptionTextColor || textColor || '#E0E0E0'
                  }]}>
                    {tip.description}|| '#FFFFFF'
                  </Text>
                </View>
                
                {showDelete && tip.id && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteTip(tip.id, tip.location)}
                    disabled={deletingTipId === tip.id}
                  >
                    {deletingTipId === tip.id ? (
                      <ActivityIndicator size="small" color="#ff4444" />
                    ) : (
                      <MaterialCommunityIcons
                        name="delete-outline"
                        size={20}
                        color="#ff4444"
                      />
                    )}
                  </TouchableOpacity>
                )}
              </View>
              
              <View style={styles.tipFooter}>
                <Text style={[styles.tipTimestamp, { 
                  color: timestampTextColor || secondaryTextColor || '#B0B0B0'
                }]}>
>>>>>>> Stashed changes
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
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tipContent: {
    flex: 1,
    marginRight: 8,
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
  deleteButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});