import { StyleSheet, View, Image, Text } from 'react-native';
import React from 'react';
import { useTheme } from '../themes/ThemeContext';
import { useAppData } from "../context/DataContext";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';


const formatTimestamp = (isoString) => {
 
  const date = new Date(isoString);
  return date.toLocaleString("sv-SE", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

const InfoCard = ({
    title = 'Default Title',
    text = 'Default Text',
    width = '90%',
    height = null,
    icon = null,
    image = null,
    textColor = null,
    backgroundColor = null,
    alertData = null,
}) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View
            style={[
                styles.card,
                { backgroundColor: backgroundColor || theme.card },
                width ? { width } : {},
                height ? { height } : { aspectRatio: 1 },
            ]}
        >
            {icon && (
                <MaterialCommunityIcons
                    name={icon}
                    size={32}
                    color={theme.background}
                    style={{ marginBottom: 8 }}
                />
            )}

            {image && (
                <Image
                    source={image}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}

            <Text style={[styles.title, { color: textColor || theme.background }]}>
                {title}
            </Text>

            <Text style={[styles.text, { color: textColor || theme.textPrimary }]}>
                {text}
            </Text>

            {alertData && (
                <View style={{ marginTop: 10 }}>
                    <Text style={[styles.text, { color: textColor || theme.textPrimary }]}>
                        Plats: {alertData.location}
                    </Text>
                    <Text style={[styles.text, { color: textColor || theme.textPrimary }]}>
                        Vattennivå: {alertData.waterlevel} cm
                    </Text>
                    <Text style={[styles.text, { color: textColor || theme.textPrimary }]}>
                        Tidpunkt: {formatTimestamp(alertData.timestamp)}
                    </Text>
                    <Text style={[styles.text, { color: textColor || theme.textPrimary }]}>
                        {alertData.description}
                    </Text>

                    {alertData.proactiveActions && (
                        <View style={{ marginTop: 6 }}>
                            {alertData.proactiveActions.basementProtection && (
                                <Text style={[styles.text, { color: textColor || theme.textPrimary }]}>
                                    • Källarskydd: {alertData.proactiveActions.basementProtection}
                                </Text>
                            )}
                            {alertData.proactiveActions.trenchDigging && (
                                <Text style={[styles.text, { color: textColor || theme.textPrimary }]}>
                                    • Grävning: {alertData.proactiveActions.trenchDigging}
                                </Text>
                            )}
                            {alertData.proactiveActions.electricHazards && (
                                <Text style={[styles.text, { color: textColor || theme.textPrimary }]}>
                                    • Elrisker: {alertData.proactiveActions.electricHazards}
                                </Text>
                            )}
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

export default InfoCard;

const createStyles = (theme) =>
    StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        minHeight: 100,
        borderRadius: 8,
        margin: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 4,
        paddingLeft: 8,
        paddingRight: 8,
        color: theme.textPrimary,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 15,
    },
});
