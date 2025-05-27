import { View, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../themes/ThemeContext';

const RenderTimelineProgressCopy = ({ status, progressAnimation, pulseAnimation, getStatusColor }) => {
   const { theme } = useTheme();
  const progressColor = getStatusColor();

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.timeline, { backgroundColor: theme.backgroundTertiary }]}>
        {status === 'Arbete pågår' && (
          <Animated.View
            style={[
              styles.timelineGlow,
              {
                backgroundColor: `${progressColor}20`,
                transform: [{ scale: pulseAnimation }],
              }
            ]}
          />
        )}

        <Animated.View
          style={[
            styles.timelineProgress,
            {
              backgroundColor: progressColor,
              width: progressAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              }),
              borderRightWidth: 2,
              borderRightColor: `${progressColor}AA`,
            }
          ]}
        />

        {[0.25, 0.5, 0.75].map((percent, index) => (
          <View
            key={index}
            style={{
              position: 'absolute',
              left: `${percent * 100}%`,
              top: 0,
              bottom: 0,
              width: 1,
              backgroundColor: theme.backgroundSecondary,
              opacity: 0.3,
            }}
          />
        ))}
      </View>
    </View>
  );
};
export default RenderTimelineProgressCopy

const styles = StyleSheet.create({
  progressBarContainer: {
    flex: 1,
    position: 'absolute',
  },
  timeline: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  timelineProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    borderRadius: 4,
    shadowColor: '#c27c03',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  timelineGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 6,
    opacity: 0.5,
  },
});

