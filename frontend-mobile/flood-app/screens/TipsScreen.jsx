import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useTheme } from '../themes/ThemeContext';
import TipInputCard from '../components/TipInputCard';
import TipsDisplayCard from '../components/TipsDisplayCard';

const TipsScreen = () => {
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
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={[styles.screenTitle, { color: theme.textColor }]}>
                    Skicka tips ifall du ser en risk för översvämning
                </Text>

                <TipInputCard
                    title="Skicka in ditt tips"
                    width="90%"
                    onTipSubmitted={handleTipSubmitted}
                    offlineMode={true}
                />

                <TipsDisplayCard
                    title="Senaste tipsen"
                    width="90%"
                    maxItems={5}
                    refresh={refreshTrigger}
                    useMockData={true}
                    localTips={localTips}
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

// npm install @react-navigation/native-stack 