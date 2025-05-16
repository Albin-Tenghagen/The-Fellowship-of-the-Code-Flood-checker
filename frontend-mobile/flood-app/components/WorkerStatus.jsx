import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { AntDesign, MaterialIcons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../themes/ThemeContext';
import { fetchSafety } from '../services/api';

const WorkerStatus = ({ locationName = null }) => {
  const { theme } = useTheme();
  const STATUS = {
    NOT_STARTED: 'Ej påbörjad',
    ON_SITE: 'På plats',
    IN_PROGRESS: 'Arbete pågår',
    COMPLETED: 'Klart'
  };
  const STATUS_ORDER = [STATUS.NOT_STARTED, STATUS.ON_SITE, STATUS.IN_PROGRESS, STATUS.COMPLETED];
  const [status, setStatus] = useState(STATUS.NOT_STARTED);
  const [timeLeft, setTimeLeft] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [safety, setSafety] = useState([]);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [fetchedLocationName, setFetchedLocationName] = useState('Nånstans i Sverige');
  const [estimatedTime, setEstimatedTime] = useState(60 * 60); 
  const [isPaused, setIsPaused] = useState(false);
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const statusFade = useRef(new Animated.Value(1)).current;
  const cardScale = useRef(new Animated.Value(1)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  

  const handleStatusChange = () => {
    const currentIndex = STATUS_ORDER.indexOf(status);
    const nextIndex = (currentIndex + 1) % STATUS_ORDER.length;
    const newStatus = STATUS_ORDER[nextIndex];
    Animated.sequence([
      Animated.timing(cardScale, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(cardScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
    Animated.timing(statusFade, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true
    }).start(() => {
      setStatus(newStatus);
      Animated.timing(statusFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    });
  };

  useEffect(() => {
    if (status === STATUS.IN_PROGRESS) {
      if (!startTime) {
        setStartTime(new Date());
      }
      setTimeLeft(estimatedTime);
      setIsPaused(false); 
    } else if (status === STATUS.ON_SITE) {
      setTimeLeft(null);
      setStartTime(null);
      setIsPaused(false);
    } else if (status === STATUS.COMPLETED) {
      setIsPaused(false); 
      if (timeLeft > 0) {
      }
    } else {
      setTimeLeft(null);
      setStartTime(null);
      setIsPaused(false);
    }
  }, [status, estimatedTime]);

  useEffect(() => {
    if (status !== STATUS.IN_PROGRESS || timeLeft === null || isPaused) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, status, isPaused]);

  useEffect(() => {
    if (timeLeft === null || estimatedTime === 0) return;
    const progress = 1 - (timeLeft / estimatedTime);
    Animated.timing(progressAnimation, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [timeLeft, estimatedTime]);

  // Add pulse animation for progress bar
  useEffect(() => {
    if (status === STATUS.IN_PROGRESS && !isPaused) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.05,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
        { iterations: -1 }
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [status, isPaused]);

  const adjustTime = (minutes) => {
    const additionalSeconds = minutes * 60;
    if (status === STATUS.IN_PROGRESS) {
      setTimeLeft(prev => Math.max(0, prev + additionalSeconds));
      setEstimatedTime(prev => Math.max(300, prev + additionalSeconds));
    } else {
      setEstimatedTime(prev => Math.max(300, prev + additionalSeconds));
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const stopWork = () => {
    setStatus(STATUS.ON_SITE);
    setTimeLeft(null);
    setStartTime(null);
    setIsPaused(false);
    setEstimatedTime(60 * 60); 
    
    Animated.timing(progressAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
    
    Animated.sequence([
      Animated.timing(cardScale, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(cardScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
  };

  const formatTime = (seconds) => {
    if (seconds === null) return '';
    if (seconds >= 3600) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours}h ${minutes}m ${secs < 10 ? '0' : ''}${secs}s kvar`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}m ${secs < 10 ? '0' : ''}${secs}s kvar`;
    }
  };

  const getElapsedTime = () => {
    if (!startTime) return null;
    const now = new Date();
    const elapsed = Math.floor((now - startTime) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
  };

  const getStatusColor = () => {
    switch (status) {
      case STATUS.NOT_STARTED:
        return '#4e535d';
      case STATUS.ON_SITE:
        return '#0e2c5c';
      case STATUS.IN_PROGRESS:
        return '#c27c03';
      case STATUS.COMPLETED:
        return '#007b52';
      default:
        return '#4e535d';
    }
  };

  const getStatusIcon = () => {
    const iconColor = getStatusColor();
    switch (status) {
      case STATUS.NOT_STARTED:
        return <AntDesign name="clockcircle" size={28} color={iconColor} />;
      case STATUS.ON_SITE:
        return <MaterialIcons name="place" size={28} color={iconColor} />;
      case STATUS.IN_PROGRESS:
        return <Entypo name="progress-two" size={28} color={iconColor} />;
      case STATUS.COMPLETED:
        return <MaterialIcons name="done" size={28} color={iconColor} />;
      default:
        return <MaterialCommunityIcons name="timer-sand-full" size={28} color={iconColor} />;
    }
  };

  useEffect(() => {
    const getSafety = async () => {
      try {
        const safetyData = await fetchSafety();
        setSafety(safetyData);
        if (safetyData.length > 0) {
          setFetchedLocationName(safetyData[0].location);
        }
      } catch (error) {
        console.log('Could not fetch safety data:', error);
      }
    };
    if (!locationName) {
      getSafety();
    }
  }, [locationName]);

  const cycleLocation = () => {
    if (safety.length > 0) {
      const nextIndex = (currentLocationIndex + 1) % safety.length;
      setCurrentLocationIndex(nextIndex);
      setFetchedLocationName(safety[nextIndex].location);
    }
  };

  const displayLocationName = locationName || fetchedLocationName;

  const renderTimelineProgress = () => {
    const progressColor = getStatusColor();
    
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.timeline, { backgroundColor: theme.backgroundTertiary }]}>
          {/* Optional glow effect */}
          {status === STATUS.IN_PROGRESS && !isPaused && (
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
                // Add a subtle gradient effect using a secondary color
                borderRightWidth: 2,
                borderRightColor: `${progressColor}AA`,
              }
            ]}
          />
          
          {/* Add percentage markers */}
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

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>

      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.inputBackground }]}>Arbetsstatus</Text>
        <Text style={[styles.subtitle, { color: theme.textTertiary }]}>
          {displayLocationName}
        </Text>
      </View>

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

      {status === STATUS.IN_PROGRESS && (
        <View style={[styles.progressSection, { backgroundColor: theme.background }]}>
          {/* Progress bar and timer in one row */}
          <View style={styles.progressHeader}>
            {renderTimelineProgress()}
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
              <Text style={styles.controlButtonText}>
                Stoppa
              </Text>
            </TouchableOpacity>
          </View>

          {isPaused && (
            <Text style={[styles.pausedText, { color: theme.textSecondary }]}>
              Arbetet är pausat
            </Text>
          )}

          <View style={styles.timeControlsCompact}>
            <TouchableOpacity
              style={[styles.timeButtonCompact, { backgroundColor: theme.backgroundSecondary, borderColor: theme.border }]}
              onPress={() => adjustTime(-30)}
            >
              <Text style={[styles.timeButtonTextCompact, { color: theme.textColor }]}>-30m</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.timeButtonCompact, { backgroundColor: theme.backgroundSecondary, borderColor: theme.border }]}
              onPress={() => adjustTime(-60)}
            >
              <Text style={[styles.timeButtonTextCompact, { color: theme.textColor }]}>-1h</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.timeButtonCompact, { backgroundColor: theme.backgroundSecondary, borderColor: theme.border }]}
              onPress={() => adjustTime(30)}
            >
              <Text style={[styles.timeButtonTextCompact, { color: theme.textColor }]}>+30m</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.timeButtonCompact, { backgroundColor: theme.backgroundSecondary, borderColor: theme.border }]}
              onPress={() => adjustTime(60)}
            >
              <Text style={[styles.timeButtonTextCompact, { color: theme.textColor }]}>+1h</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Time Stats */}
      {startTime && status !== STATUS.NOT_STARTED && (
        <View style={[styles.timeStats, { backgroundColor: theme.backgroundSecondary }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.textTertiary }]}>Startad</Text>
            <Text style={[styles.statValue, { color: theme.textTertiary }]}>
              {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
          {status !== STATUS.ON_SITE && getElapsedTime() && (
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: theme.textTertiary }]}>Tid aktiv</Text>
              <Text style={[styles.statValue, { color: theme.textTertiary }]}>
                {getElapsedTime()}
              </Text>
            </View>
          )}
        </View>
      )}
      
      {status === STATUS.NOT_STARTED && (
        <View style={[styles.instructionContainer, { backgroundColor: theme.backgroundTertiary }]}>
          <View style={styles.instructionContent}>
            <MaterialIcons name="info-outline" size={20} color={theme.primary} />
            <Text style={[styles.instructionText, { color: theme.primary }]}>
              Tryck på kortet för att börja med "På plats" när du anländer till arbetsplatsen.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    marginTop: 25,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
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
  progressBarContainer: {
    flex: 1,
    position: 'absolute',
  },
  timeline: {
    height: 8, // Increased from 6 to 8
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0', // More defined background
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
    backgroundColor: 'rgba(194, 124, 3, 0.2)',
    opacity: 0.5,
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
  timeStats: {
    flexDirection: 'row',
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  instructionContainer: {
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
  },
  instructionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 12,
    flex: 1,
    fontWeight: '500',
  },
  locationHint: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
    marginTop: 2,
  },
});

export default WorkerStatus;