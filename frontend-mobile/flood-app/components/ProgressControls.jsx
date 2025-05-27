import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import RenderTimelineProgress from './RenderTimelineProgress';
import { useTheme } from '../themes/ThemeContext';

const ProgressControls = ({
  status,
  timeLeft,
  isPaused,
  togglePause,
  stopWork,
  adjustTime,
  formatTime,
  progressAnimation,
  pulseAnimation,
  getStatusColor,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.progressSection, { backgroundColor: theme.background }]}>
      <View style={styles.progressHeader}>
        <RenderTimelineProgress
          status={status}
          progressAnimation={progressAnimation}
          pulseAnimation={pulseAnimation}
          getStatusColor={getStatusColor}
        />
        <Text style={[styles.timerTextCompact, { color: theme.textColor }]}>
          {formatTime(timeLeft)}
        </Text>
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={[
            styles.pauseButton,
            {
              backgroundColor: isPaused ? '#007b52' : '#c27c03',
              borderColor: isPaused ? '#007b52' : '#c27c03'
            }
          ]}
          onPress={togglePause}
        >
          <MaterialIcons
            name={isPaused ? "play-arrow" : "pause"}
            size={20}
            color="white"
          />
          <Text style={styles.controlButtonText}>
            {isPaused ? 'Fortsätt' : 'Paus'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.stopButton,
            {
              backgroundColor: '#d32f2f',
              borderColor: '#d32f2f'
            }
          ]}
          onPress={stopWork}
        >
          <MaterialIcons
            name="stop"
            size={20}
            color="white"
          />
          <Text style={styles.controlButtonText}>Stoppa</Text>
        </TouchableOpacity>
      </View>

      {isPaused && (
        <Text style={[styles.pausedText, { color: theme.textSecondary }]}>
          Arbetet är pausat
        </Text>
      )}

      <View style={styles.timeControlsCompact}>
        {[-30, -60, 30, 60].map((val, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeButtonCompact,
              {
                backgroundColor: theme.backgroundSecondary,
                borderColor: theme.border
              }
            ]}
            onPress={() => adjustTime(val)}
          >
            <Text style={[styles.timeButtonTextCompact, { color: theme.textColor }]}>
              {val > 0 ? `+${val / 60}h`.replace('.5', '30m') : `${val / 60}h`.replace('.5', '30m')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressSection: {
    margin: 20,
    marginTop: 0,
    padding: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    gap: 12,
  },
  timerTextCompact: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
    minWidth: 100,
    textAlign: 'right',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  pauseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    flex: 1,
    maxWidth: 120,
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    flex: 1,
    maxWidth: 120,
  },
  controlButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  pausedText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  timeControlsCompact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  timeButtonCompact: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
  },
  timeButtonTextCompact: {
    fontWeight: '600',
    fontSize: 13,
  },
});

export default ProgressControls;