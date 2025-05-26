import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../themes/ThemeContext';
import FlatListLocation from './FlatListLocation';
import { fetchSafety } from '../services/api';

const { width: screenWidth } = Dimensions.get('window');

const PickLocation = ({ navigation }) => {
  const { theme } = useTheme();
  const [safety, setSafety] = useState([]);
  const [loading, setLoading] = useState(true);

  const styles = createStyles(theme);

  useEffect(() => {
    const getSafety = async () => {
      try {
        setLoading(true);
        const safetyData = await fetchSafety();
        setSafety(safetyData);
        console.log('📊 Safety data loaded:', safetyData);
      } catch (error) {
        console.error('❌ Kunde inte hämta säkerhetsdata:', error);
      } finally {
        setLoading(false);
      }
    };

    getSafety();
  }, []);

  const handleLocationSelect = (selectedLocation) => {
    console.log('📍 Location selected:', selectedLocation);
    
    // Navigate to the next screen with selected location data
    navigation.navigate('SelectedLocationCard', {
      location: selectedLocation,
      safetyData: safety
    });
    
    // Alternative navigation options:
    // navigation.navigate('WorkerStatus', { location: selectedLocation });
    // navigation.push('LocationDetails', { location: selectedLocation });
  };

  return (
    <View style={styles.container}>
      {/* Instruction Header */}
      <View style={styles.instructionContainer}>
        <View style={styles.instructionContent}>
          <View style={styles.iconContainer}>
            <MaterialIcons 
              name="info-outline" 
              size={24} 
              color={theme.primary} 
            />
          </View>
          <View style={styles.instructionTextContainer}>
            <Text style={[styles.instructionTitle, { color: theme.textPrimary }]}>
              Välj arbetsplats
            </Text>
            <Text style={[styles.instructionText, { color: theme.textSecondary }]}>
              Välj en övervakningsplats för att börja arbeta. Du kan se vattennivåer och riskstatus för varje plats.
            </Text>
          </View>
        </View>
      </View>

      {/* Location List */}
      <View style={styles.listContainer}>
        <FlatListLocation 
          onLocationSelect={handleLocationSelect}
          safetyData={safety}
          loading={loading}
        />
      </View>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  
  instructionContainer: {
    backgroundColor: theme.card,
    margin: 16,
    marginBottom: 8,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  instructionContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  
  iconContainer: {
    backgroundColor: theme.primaryLight || theme.primary + '20',
    padding: 8,
    borderRadius: 12,
    marginRight: 16,
  },
  
  instructionTextContainer: {
    flex: 1,
  },
  
  instructionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  
  instructionText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  
  listContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
});

export default PickLocation;