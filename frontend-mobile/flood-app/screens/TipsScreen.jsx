import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../themes/ThemeContext';
import TipInputCard from '../components/TipInputCard';
import { useTips } from '../context/TipsContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TipsScreen = ({
    backgroundColor = null,
    textColor = null,
    titleColor = null,
    cardBackgroundColor = null,
}) => {
    const { theme } = useTheme();
    const { triggerRefresh } = useTips();
    const navigation = useNavigation();

    return (
        <View style={[styles.container, { backgroundColor: backgroundColor || theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={[styles.screenTitle, { color: titleColor || textColor || theme.card }]}>
                    Skicka tips ifall du ser en risk för översvämning
                </Text>
                <TipInputCard
                    title="Skicka in ditt tips"
                    width="90%"
                    onTipSubmitted={triggerRefresh}
                    backgroundColor={cardBackgroundColor}
                    textColor={theme.background}
                    iconColor={theme.background}
                    
                />
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.button, { backgroundColor: theme.accent }]}
                >
                    <MaterialIcons name="arrow-back" size={28} color={theme.secondary} />
                </TouchableOpacity>

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
        padding: 6,
        alignItems: 'center',
    },
    screenTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 6,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 30,
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
});