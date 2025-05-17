// AnimatedButton.js
import { StyleSheet, Text, Animated, Pressable, View } from 'react-native';
import React, { useRef } from 'react';
import { useTheme } from '../themes/ThemeContext';

const AnimatedButton = ({ title, onPress, data, style }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();

        if (onPress) {
            onPress(data);
        }
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            tension: 40,
            friction: 2,
            useNativeDriver: true,
        }).start();
    };

       const handlePress = () => {
        if (onPress) {
            onPress(data);
        }
    };

    return (
        <Animated.View style={[styles.buttonWrapper, { transform: [{ scale }] }]}>
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handlePress}
                style={styles.button}
                accessibilityRole="button"
                accessibilityLabel="Knapp med animering"
            >
                <Text style={styles.buttonText}>{title}</Text>
            </Pressable>
        </Animated.View>
    );
};

export default AnimatedButton;

const createStyles = (theme) =>
    StyleSheet.create({
        buttonWrapper: {
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
        },
        button: {
            backgroundColor: theme.accent,
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 8,
        },
        buttonText: {
            fontSize: 18,
            color: 'white', // eller vad som passar
        },
    });
