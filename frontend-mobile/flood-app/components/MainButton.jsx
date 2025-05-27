import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useTheme } from '../themes/ThemeContext';

const MainButton = ({ onPress, title = "Tryck här", variant = "primary", style}) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

  return (
    <Pressable
        onPress={onPress}
        style={({ pressed }) => [
            styles.base,
            styles[variant],
            pressed && styles.pressed,
            style,
        ]}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
  )
}

export default MainButton

const createStyles = (theme) =>
    StyleSheet.create({
        base: {
            alignSelf: "center",
            paddingVertical: 5,
            paddingHorizontal: 5,
            borderRadius: 8,
            alignItems: "center",
            borderWidth: 1,
        },
        primary: {
            backgroundColor: theme.primary,
            borderColor: theme.primary,
        },
        secondary: {
            backgroundColor: theme.primary,
            borderColor: theme.accent,
        },
        pressed: {
            opacity: 0.75,
        },
        text: {
            fontSize: 16,
            fontWeight: "500",
        }
    });