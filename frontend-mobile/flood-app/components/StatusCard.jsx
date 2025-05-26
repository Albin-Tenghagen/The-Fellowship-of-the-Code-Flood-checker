import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../themes/ThemeContext';

const StatusCard = ({
  status,
  getStatusColor,
  getStatusIcon,
  statusFade,
  cardScale,
  handleStatusChange
}) => {
  const { theme } = useTheme();

  return (
    <Animated.View
      style={[
        styles.statusCard,
        {
          transform: [{ scale: cardScale }],
          backgroundColor: theme.background,
          borderColor: theme.primary,
        }
      ]}
    >
      <TouchableOpacity
        style={styles.cardTouchable}
        onPress={handleStatusChange}
        activeOpacity={0.9}
      >
        <Animated.View style={[styles.cardContent, { opacity: statusFade }]}>
          <View style={[styles.iconContainer, { backgroundColor: getStatusColor() + '15' }]}>
            {getStatusIcon()}
          </View>
          <Text style={[styles.statusTitle, { color: getStatusColor() }]}>
            {status}
          </Text>
          <Text style={[styles.tapInstruction, { color: theme.textSecondary }]}>
            Tryck för att ändra status
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  statusCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTouchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  tapInstruction: {
    fontSize: 13,
    fontWeight: '500',
    opacity: 0.8,
  },
});

export default StatusCard;