import { StyleSheet, Text, View, FlatList, StatusBar, Alert, Dimensions, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CheckBox from './CheckBox';
import AnimatedButton from './AnimatedButton';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../themes/ThemeContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const mockLocationData = [
  {
    id: 1,
    location: "Göta älv - Göteborg",
    waterlevel: 8,
    priority: "critical",
    description: "Kritisk vattennivå vid centrala Göteborg",
    coordinates: "57.7089, 11.9746"
  },
  {
    id: 2,
    location: "Motala ström - Norrköping",
    waterlevel: 6,
    priority: "high",
    description: "Förhöjd vattennivå i industriområdet",
    coordinates: "58.5877, 16.1924"
  },
  {
    id: 3,
    location: "Dalälven - Gävle",
    waterlevel: 9,
    priority: "critical",
    description: "Mycket hög vattennivå - översvämningsrisk",
    coordinates: "60.6749, 17.1413"
  },
  {
    id: 4,
    location: "Klarälven - Karlstad",
    waterlevel: 4,
    priority: "medium",
    description: "Normala nivåer men kräver övervakning",
    coordinates: "59.3793, 13.5036"
  },
  {
    id: 5,
    location: "Lule älv - Luleå",
    waterlevel: 7,
    priority: "high",
    description: "Stigande vattennivåer vid kraftverket",
    coordinates: "65.5841, 22.1547"
  },
  {
    id: 6,
    location: "Fyrisån - Uppsala",
    waterlevel: 3,
    priority: "low",
    description: "Låga vattennivåer, ingen omedelbar risk",
    coordinates: "59.8586, 17.6389"
  }
];

const USE_MOCK_DATA = true;

const FlatListLocation = ({
  onLocationSelect = null,
  safetyData = [],
  loading: externalLoading = false,
}) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const styles = createStyles(theme);

  useEffect(() => {
    const getLocations = async () => {
      try {
        let data;

        if (externalLoading) {
          setLoading(true);
          return;
        }

        if (USE_MOCK_DATA) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          data = { products: mockLocationData };
          console.log('🧪 Using mock location data');
        } else {
          const response = await fetch('http://localhost:5001/users/safety');
          data = await response.json();
        }

        const processedLocations = data.products.map(item => ({
          ...item,
          waterlevel: item.waterlevel || Math.floor(Math.random() * 10),
        }));

        processedLocations.sort((a, b) => b.waterlevel - a.waterlevel);
        setLocations(processedLocations);

      } catch (error) {
        console.error('Fel vid API-anrop:', error);
        Alert.alert('Fel', 'Kunde inte hämta platsdata');
      } finally {
        setLoading(false);
      }
    };

    getLocations();
  }, [externalLoading]);

  const onSelect = (id) => {
    setSelectedId(id);
  };

  const getPriorityConfig = (level) => {
    if (level >= 8) return {
      color: theme.colors?.error || '#FF4444',
      icon: 'alert-circle',
      text: 'KRITISK',
      bgColor: theme.colors?.errorLight || '#FFE6E6'
    };
    if (level >= 6) return {
      color: theme.colors?.warning || '#FF8800',
      icon: 'alert',
      text: 'HÖG',
      bgColor: theme.colors?.warningLight || '#FFF4E6'
    };
    if (level >= 4) return {
      color: theme.colors?.info || '#2196F3',
      icon: 'information',
      text: 'MEDIUM',
      bgColor: theme.colors?.infoLight || '#E3F2FD'
    };
    return {
      color: theme.colors?.success || '#4CAF50',
      icon: 'check-circle',
      text: 'LÅG',
      bgColor: theme.colors?.successLight || '#E8F5E8'
    };
  };

  const renderItem = ({ item, index }) => {
    const priorityConfig = getPriorityConfig(item.waterlevel);
    const isSelected = selectedId === item.id;

    return (
      <View style={[
        styles.itemContainer,
        isSelected && styles.selectedItem,
        { backgroundColor: isSelected ? priorityConfig.bgColor : theme.card }
      ]}>
        <View style={styles.itemContent}>

          <View style={[styles.priorityBadge, { backgroundColor: priorityConfig.color }]}>
            <MaterialCommunityIcons
              name={priorityConfig.icon}
              size={16}
              color="white"
            />
            <Text style={styles.priorityText}>{priorityConfig.text}</Text>
          </View>

          <View style={styles.locationInfo}>
            <Text style={[styles.locationTitle, { color: theme.textPrimary }]}>
              {item.location}
            </Text>
            <Text style={[styles.locationDescription, { color: theme.textSecondary }]}>
              {item.description}
            </Text>
            <View style={styles.detailsRow}>
              <MaterialCommunityIcons
                name="water"
                size={16}
                color={priorityConfig.color}
              />
              <Text style={[styles.waterLevel, { color: priorityConfig.color }]}>
                {item.waterlevel} cm
              </Text>
              <MaterialCommunityIcons
                name="map-marker"
                size={14}
                color={theme.textSecondary}
                style={{ marginLeft: 12 }}
              />
              <Text style={[styles.coordinates, { color: theme.textSecondary }]}>
                {item.coordinates}
              </Text>
            </View>
          </View>
          <View style={styles.selectionArea}>
            <CheckBox
              isChecked={isSelected}
              onPress={() => onSelect(item.id)}
            />
          </View>
        </View>
        <View style={styles.tapArea} onTouchEnd={() => onSelect(item.id)} />
      </View>
    );
  };

  const onButtonPress = () => {
    if (selectedId) {
      const chosen = locations.find(loc => loc.id === selectedId);
      console.log('Vald plats:', chosen);

      navigation.navigate('WorkerStatus', {
        location: chosen,
        safetyData: safetyData,
        resetStatus: true  
      });

    } else {
      Alert.alert('Varning', 'Vänligen välj en plats först!');
    }
  };

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <MaterialCommunityIcons
              name="loading"
              size={32}
              color={theme.primary}
            />
            <Text style={[styles.loadingText, { color: theme.textPrimary }]}>
              Laddar övervakningsplatser...
            </Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="map-marker-multiple"
            size={28}
            color={theme.primary}
          />
          <View style={styles.headerTextContainer}>
            <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
              Övervakningsplatser
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
              Välj plats för vattenövervakning
            </Text>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={[styles.statItem, { backgroundColor: theme.colors?.errorLight || '#FFE6E6' }]}>
            <Text style={[styles.statNumber, { color: theme.colors?.error || '#FF4444' }]}>
              {locations.filter(l => l.waterlevel >= 8).length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Kritisk</Text>
          </View>
          <View style={[styles.statItem, { backgroundColor: theme.colors?.warningLight || '#FFF4E6' }]}>
            <Text style={[styles.statNumber, { color: theme.colors?.warning || '#FF8800' }]}>
              {locations.filter(l => l.waterlevel >= 6 && l.waterlevel < 8).length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Hög risk</Text>
          </View>
          <View style={[styles.statItem, { backgroundColor: theme.colors?.successLight || '#E8F5E8' }]}>
            <Text style={[styles.statNumber, { color: theme.colors?.success || '#4CAF50' }]}>
              {locations.filter(l => l.waterlevel < 6).length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Normal</Text>
          </View>
        </View>

        {/* Location List */}
        <FlatList
          data={locations}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          <AnimatedButton
            title="Påbörja övervakning"
            onPress={onButtonPress}
            style={[styles.actionButton, {
              backgroundColor: selectedId ? theme.primary : theme.disabled,
              opacity: selectedId ? 1 : 0.6
            }]}
            disabled={!selectedId}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default FlatListLocation;

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 16,
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
    },
    headerTextContainer: {
      marginLeft: 12,
      flex: 1,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    headerSubtitle: {
      fontSize: 14,
      marginTop: 2,
    },

    // Statistics Styles
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 12,
      marginHorizontal: 4,
      borderRadius: 12,
    },
    statNumber: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    statLabel: {
      fontSize: 12,
      marginTop: 2,
    },

    flatList: {
      flex: 1,
    },
    flatListContent: {
      paddingBottom: 20,
    },
    separator: {
      height: 8,
    },

    // Item Styles
    itemContainer: {
      borderRadius: 16,
      marginVertical: 4,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      position: 'relative',
    },
    selectedItem: {
      elevation: 4,
      shadowOpacity: 0.2,
      transform: [{ scale: 0.98 }],
    },
    itemContent: {
      flexDirection: 'row',
      padding: 16,
      alignItems: 'flex-start',
    },
    tapArea: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },

    priorityBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    priorityText: {
      color: 'white',
      fontSize: 10,
      fontWeight: 'bold',
      marginLeft: 4,
    },

    locationInfo: {
      flex: 1,
      marginLeft: 12,
      marginRight: 8,
    },
    locationTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    locationDescription: {
      fontSize: 13,
      lineHeight: 18,
      marginBottom: 8,
    },
    detailsRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    waterLevel: {
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 4,
    },
    coordinates: {
      fontSize: 12,
      marginLeft: 4,
    },

    selectionArea: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
    },

    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 16,
      marginTop: 12,
      textAlign: 'center',
    },

    buttonContainer: {
      paddingVertical: 16,
      paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    },
    actionButton: {
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });