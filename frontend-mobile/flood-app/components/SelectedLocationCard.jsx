import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../themes/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SelectedLocationCard = ({ 
  location, 
  onBack,
  width = '90%',
  iconColor = null,
  titleColor = null,
  textColor = null,
  secondaryTextColor = null,
  borderColor = null,
  primaryButtonColor = null,
  secondaryButtonColor = null,
  alertButtonColor = null,
}) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleConfirm = () => {
    navigation.navigate('WorkerStatus', {
      location: location
    });
  };

  return (
    <View style={[
      styles.cardContainer, 
      { 
        backgroundColor: theme.card,
        width: width 
      }
    ]}>
      {/* Header with icon */}
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="map-marker-check-outline"
          size={24}
          color={iconColor || theme.primary}
          style={{ marginRight: 8 }}
        />
        <Text style={[
          styles.title, 
          { color: titleColor || theme.textPrimary }
        ]}>
          Vald plats
        </Text>
      </View>

      {/* Location details */}
      <View style={styles.detailsContainer}>
        <View style={[
          styles.detailItem,
          { borderBottomColor: borderColor || theme.primary }
        ]}>
          <Text style={[
            styles.label, 
            { color: textColor || theme.textPrimary }
          ]}>
            Plats
          </Text>
          <Text style={[
            styles.value, 
            { color: textColor || theme.textPrimary }
          ]}>
            {location.location}
          </Text>
        </View>

        <View style={[
          styles.detailItem,
          { borderBottomColor: borderColor || theme.primary }
        ]}>
          <Text style={[
            styles.label, 
            { color: textColor || theme.textPrimary }
          ]}>
            Vattennivå
          </Text>
          <Text style={[
            styles.value, 
            { color: textColor || theme.textPrimary }
          ]}>
            {location.waterlevel} cm
          </Text>
        </View>

        <View style={[
          styles.detailItem,
          { borderBottomColor: borderColor || theme.primary }
        ]}>
          <Text style={[
            styles.label, 
            { color: textColor || theme.textPrimary }
          ]}>
            Tidpunkt
          </Text>
          <Text style={[
            styles.value, 
            { color: secondaryTextColor || theme.textSecondary }
          ]}>
            {location.timestamp}
          </Text>
        </View>

        <View style={[
          styles.detailItem,
          { borderBottomColor: borderColor || theme.textPrimary }
        ]}>
          <Text style={[
            styles.label, 
            { color: textColor || theme.textPrimary }
          ]}>
            Beskrivning
          </Text>
          <Text style={[
            styles.description, 
            { color: textColor || theme.textPrimary }
          ]}>
            {location.description}
          </Text>
        </View>

        {/* Proactive Actions Section */}
        {location.proactiveActions && (
          <View style={styles.proactiveSection}>
            <View style={styles.proactiveHeader}>
              <MaterialCommunityIcons
                name="shield-check-outline"
                size={20}
                color={iconColor || theme.primary}
                style={{ marginRight: 6 }}
              />
              <Text style={[
                styles.subheading, 
                { color: textColor || theme.textPrimary }
              ]}>
                Förebyggande åtgärder
              </Text>
            </View>
            
            {location.proactiveActions.basementProtection && (
              <View style={styles.actionItem}>
                <MaterialCommunityIcons
                  name="home-outline"
                  size={16}
                  color={secondaryTextColor || theme.textSecondary}
                  style={{ marginRight: 6, marginTop: 2 }}
                />
                <Text style={[
                  styles.actionText, 
                  { color: textColor || theme.textPrimary }
                ]}>
                  <Text style={{ fontWeight: '600' }}>Källarskydd:</Text> {location.proactiveActions.basementProtection}
                </Text>
              </View>
            )}
            
            {location.proactiveActions.trenchDigging && (
              <View style={styles.actionItem}>
                <MaterialCommunityIcons
                  name="shovel"
                  size={16}
                  color={secondaryTextColor || theme.textSecondary}
                  style={{ marginRight: 6, marginTop: 2 }}
                />
                <Text style={[
                  styles.actionText, 
                  { color: textColor || theme.textPrimary }
                ]}>
                  <Text style={{ fontWeight: '600' }}>Grävning:</Text> {location.proactiveActions.trenchDigging}
                </Text>
              </View>
            )}
            
            {location.proactiveActions.electricHazards && (
              <View style={styles.actionItem}>
                <MaterialCommunityIcons
                  name="flash-outline"
                  size={16}
                  color={secondaryTextColor || theme.textSecondary}
                  style={{ marginRight: 6, marginTop: 2 }}
                />
                <Text style={[
                  styles.actionText, 
                  { color: textColor || theme.textPrimary }
                ]}>
                  <Text style={{ fontWeight: '600' }}>Elrisker:</Text> {location.proactiveActions.electricHazards}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Action buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[
            styles.button, 
            styles.primaryButton,
            { backgroundColor: primaryButtonColor || theme.primary }
          ]} 
          onPress={handleConfirm}
        >
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={18}
            color="#fff"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.buttonText}>Välj denna plats</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.button, 
            styles.secondaryButton,
            { backgroundColor: secondaryButtonColor || theme.backgroundSecondary }
          ]} 
          onPress={onBack}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={18}
            color={textColor || theme.textPrimary}
            style={{ marginRight: 6 }}
          />
          <Text style={[
            styles.buttonText, 
            { color: textColor || theme.textPrimary }
          ]}>
            Gå tillbaka
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.button,
            styles.alertButton,
            { backgroundColor: alertButtonColor || '#dc3545' }
          ]}
          onPress={() => {
            navigation.navigate("Home", {
              alert: {
                location: location.location,
                waterlevel: location.waterlevel,
                timestamp: location.timestamp,
                description: location.description,
                proactiveActions: location.proactiveActions,
              }
            });
          }}
        >
          <MaterialCommunityIcons
            name="bell-alert-outline"
            size={18}
            color="#fff"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.buttonText}>Skicka notis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
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
  detailsContainer: {
    marginBottom: 16,
  },
  detailItem: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  proactiveSection: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  proactiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingLeft: 4,
  },
  actionText: {
    fontSize: 14,
    lineHeight: 18,
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  primaryButton: {
    // Primary button specific styles
  },
  secondaryButton: {
    // Secondary button specific styles
  },
  alertButton: {
    // Alert button specific styles
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#fff',
  },
});

export default SelectedLocationCard;