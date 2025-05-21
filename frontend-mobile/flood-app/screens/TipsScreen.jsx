import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useTheme } from '../themes/ThemeContext';
import TipInputCard from '../components/TipInputCard';
import TipsDisplayCard from '../components/TipsDisplayCard';

const TipsScreen = ({
    backgroundColor,
    textColor,
    titleColor,
    cardBackgroundColor,
}) => {
    const { theme } = useTheme();
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [localTips, setLocalTips] = useState([]);

    const handleTipSubmitted = (newTip) => {
        setLocalTips(prev => [{
            id: Date.now(),
            ...newTip,
            user: "Du"
        }, ...prev]);

        setRefreshTrigger(!refreshTrigger);
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
                    offlineMode={true}
                    backgroundColor={cardBackgroundColor}
                    textColor={theme.textPrimary}
                />

                <TipsDisplayCard
                    title="Senaste tipsen"
                    width="90%"
                    maxItems={5}
                    refresh={refreshTrigger}
                    useMockData={true}
                    localTips={localTips}
                    backgroundColor={cardBackgroundColor}
                    textColor={theme.textPrimary}
                />
            </ScrollView>
        </View>
    );
};

// Default props (optional)
TipsScreen.defaultProps = {
    backgroundColor: null, // Will use theme.background as fallback
    textColor: null, // Will use theme.textColor as fallback
    titleColor: null, // Will use textColor or theme.textColor as fallback
    cardBackgroundColor: null, // Will pass to child components
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

// npm install @react-navigation/native-stack