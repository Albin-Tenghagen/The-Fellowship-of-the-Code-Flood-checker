import { StyleSheet, View, Image, Text } from 'react-native';
import React from 'react';
import { useTheme } from '../themes/ThemeContext';
import { useAppData } from "../context/DataContext";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const InfoCard = ({
    title = 'Default Title',
    text = 'Default Text',
    width = '45%',
    height = null,
    icon = null,
    image = null,
    titleColor = null,
    textColor = null,
    iconColor = null,
    backgroundColor = null,
}) => {

    const { theme } = useTheme();

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
                    color={iconColor || theme.icon}
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

            <Text style={[styles.title, { color: titleColor || theme.textPrimary }]}>
                {title}
            </Text>
            <Text style={[styles.text, { color: textColor || theme.textPrimary }]}>
                {text}
            </Text>
        </View>
    );
};

export default InfoCard;

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        aspectRatio: 1,
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
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
    },
});
