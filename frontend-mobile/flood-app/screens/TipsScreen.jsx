import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useTheme } from '../themes/ThemeContext';
import TipInputCard from '../components/TipInputCard';
import { useTips } from '../context/TipsContext';

const TipsScreen = ({
    backgroundColor = null,
    textColor = null,
    titleColor = null,
    cardBackgroundColor = null,
}) => {
    const { theme } = useTheme();
    const { triggerRefresh } = useTips();

    return (
        <View style={[styles.container, { backgroundColor: backgroundColor || theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={[styles.screenTitle, { color: titleColor || textColor || theme.textPrimary }]}>
                    Skicka tips ifall du ser en risk för översvämning
                </Text>
                <TipInputCard
                    title="Skicka in ditt tips"
                    width="90%"
                    onTipSubmitted={triggerRefresh}
                    backgroundColor={cardBackgroundColor}
                    textColor={theme.textPrimary}
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