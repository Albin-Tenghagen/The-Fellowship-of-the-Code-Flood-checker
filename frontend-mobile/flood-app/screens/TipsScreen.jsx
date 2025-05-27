import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useTheme } from '../themes/ThemeContext';
import TipInputCard from '../components/TipInputCard';
import TipsDisplayCard from '../components/TipsDisplayCard';

const TipsScreen = ({
    backgroundColor = null,
    textColor = null,
    titleColor = null,
    cardBackgroundColor = null,
}) => {
    const { theme } = useTheme();
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const handleTipSubmitted = () => {
        setRefreshTrigger(prev => !prev);
    };

    return (
        <View style={[styles.container, { backgroundColor: backgroundColor || theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={[styles.screenTitle, { color: titleColor || textColor || theme.textPrimary }]}>
                    Skicka tips ifall du ser en risk för översvämning
                </Text>

                <TipInputCard
                    title="Skicka in ditt tips"
                    width="90%"
                    onTipSubmitted={handleTipSubmitted}
                    backgroundColor={cardBackgroundColor}
                    textColor={theme.textPrimary}
                    iconColor={theme.primary}
                />

                <TipsDisplayCard
                    title="Senaste tipsen"
                    width="90%"
                    maxItems={5}
                    refresh={refreshTrigger}
                    backgroundColor={cardBackgroundColor}
                    textColor={theme.primary}
                    iconColor={theme.primary}
                />

            </ScrollView>
        </View>
    );
};

export default TipsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        padding: 16,
        alignItems: 'center',
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
        textAlign: 'center',
    },
});