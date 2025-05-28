import { StyleSheet, Text, View, FlatList, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getLocationsWithWaterLevel } from '../services/firebaseUtils';
import CheckBox from './CheckBox';
import { useTheme } from '../themes/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FlatListLocation = ({
  onSend,
  width = '90%',
  maxItems = null,
  title = 'Mätstationer',
  iconColor = null,
  titleColor = null,
  textColor = null,
  secondaryTextColor = null,
  borderColor = null,
  emptyText = 'Inga mätstationer tillgängliga',
  loadingText = 'Laddar...',
  errorTextPrefix = 'Fel: ',
}) => {
  if (!onSend) {
    console.warn("Prop 'onLocationSelect' saknas i FlatListLocation");
  }

  const { theme } = useTheme();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLocationsWithWaterLevel();
        setLocations(data || []);
      } catch (error) {
        console.error("Fel vid hämtning från Firebase:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const onSelect = (id) => {
    setSelectedId(id);
    const chosen = locations.find(loc => loc.id === id);
    if (chosen) {
      console.log("Vald plats:", chosen);
      onSend(chosen);
    }
  };

  const displayedLocations = maxItems ? locations.slice(0, maxItems) : locations;

  const renderItem = ({ item }) => (
    <View style={[
      styles.itemContainer,
      { borderBottomColor: borderColor || theme.primary }
    ]}>
      <CheckBox
        id={item.id}
        title={`${item.location} (${item.waterlevel} cm)`}
        isChecked={selectedId === item.id}
        onPress={() => onSelect(item.id)}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={[
        styles.card,
        {
          backgroundColor: theme.card,
          width: width
        }
      ]}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="map-marker-multiple-outline"
            size={24}
            color={iconColor || theme.primary}
            style={{ marginRight: 8 }}
          />
          <Text style={[styles.title, { color: titleColor || theme.textPrimary }]}>
            {title}
          </Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={iconColor || theme.primary} style={styles.loader} />
          <Text style={[styles.loadingText, { color: secondaryTextColor || theme.textSecondary }]}>
            {loadingText}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={[
        styles.card,
        {
          backgroundColor: theme.card,
          width: width
        }
      ]}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="map-marker-multiple-outline"
            size={24}
            color={iconColor || theme.primary}
            style={{ marginRight: 8 }}
          />
          <Text style={[styles.title, { color: titleColor || theme.textPrimary }]}>
            {title}
          </Text>
        </View>

        {error ? (
          <Text style={[styles.errorText, { color: 'red' }]}>
            {errorTextPrefix}{error}
          </Text>
        ) : displayedLocations.length === 0 ? (
          <Text style={[styles.emptyText, { color: secondaryTextColor || theme.textPrimary}]}>
            {emptyText}
          </Text>
        ) : (
          <FlatList
            data={displayedLocations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContainer}
            style={styles.listContainer}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          />
        )}
      </View>
    </ScrollView>
  );
};

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
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loader: {
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 16  ,
    textAlign: 'center',
  },
  errorText: {
    marginVertical: 12,
    textAlign: 'center',
    fontSize: 14,
  },
  emptyText: {
    marginVertical: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 14,
  },
  listContainer: {
    maxHeight: 500,
  },
  flatListContainer: {
    paddingBottom: 8,
  },
  itemContainer: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});

export default FlatListLocation;