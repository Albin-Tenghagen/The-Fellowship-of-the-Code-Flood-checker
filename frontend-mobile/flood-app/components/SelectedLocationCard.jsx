import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../themes/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const SelectedLocationCard = ({ location, onBack }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleConfirm = () => {
    navigation.navigate('WorkerStatus', { 
      location: location 
    });
  };

  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>Vald plats</Text>
      <Text style={[styles.text, { color: theme.textColor }]}>Plats: {location.location}</Text>
      <Text style={[styles.text, { color: theme.textColor }]}>Vattennivå: {location.waterlevel} cm</Text>
      <Text style={[styles.text, { color: theme.textColor }]}>Tidpunkt: {location.timestamp}</Text>
      <Text style={[styles.text, { color: theme.textColor }]}>Beskrivning: {location.description}</Text>
      {location.proactiveActions && (
        <View style={{ marginTop: 10 }}>
          <Text style={[styles.subheading, { color: theme.textColor }]}>Förebyggande åtgärder:</Text>
          {location.proactiveActions.basementProtection && (
            <Text style={[styles.text, { color: theme.textColor }]}>• Källarskydd: {location.proactiveActions.basementProtection}</Text>
          )}
          {location.proactiveActions.trenchDigging && (
            <Text style={[styles.text, { color: theme.textColor }]}>• Grävning: {location.proactiveActions.trenchDigging}</Text>
          )}
          {location.proactiveActions.electricHazards && (
            <Text style={[styles.text, { color: theme.textColor }]}>• Elrisker: {location.proactiveActions.electricHazards}</Text>
          )}
        </View>
      )}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Välj denna plats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.backgroundSecondary }]} onPress={onBack}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>Gå tillbaka</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 20,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 8,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    color: '#fff',
  },
});

export default SelectedLocationCard;