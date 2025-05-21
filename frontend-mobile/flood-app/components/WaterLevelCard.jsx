import { StyleSheet, View, Image, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fetchMonitoring } from '../services/api';

const WaterLevelCard = ({
    title = 'Standardtitel',
    width = '45%',
    height = null,
    icon = null,
    image = null,
    parameter = null,
    alternateParams = [],
    titleColor = null,
    valueColor = null,
    timestampColor = null, 
}) => {
    const { theme } = useTheme();
    const [paramValue, setParamValue] = useState('Ej tillgänglig');
    const [timestamp, setTimestamp] = useState('Ingen tid');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatParameterValue = (value) => {
        if (value === null || value === undefined || value === 'Ej tillgänglig') {
            return 'Ej tillgänglig';
        }

        const numValue = typeof value === 'string' ? parseFloat(value) : value;
        if (isNaN(numValue)) {
            return value.toString();
        }

        switch (parameter) {
            case 'temperature':
                return numValue.toFixed(0);
            case 'humidity':
            case 'soilMoisture':
                return Math.round(numValue);
            case 'ultraSoundLevel':
                return numValue.toFixed(1);
            case 'airPressure':
            case 'pressureLevel':
                return Math.round(numValue);
            default:
                return Math.abs(numValue) < 10 ? numValue.toFixed(1) : Math.round(numValue);
        }
    };

    const getParameterIcon = () => {
        if (!parameter) return icon;

        const iconMap = {
            airPressure: 'weather-windy',
            soilMoisture: 'water-percent',
            temperature: 'thermometer',
            humidity: 'water-percent',
            pressureLevel: 'gauge',
            ultraSoundLevel: 'wave',
        };

        return iconMap[parameter] || icon;
    };

    const getParameterUnit = () => {
        const unitMap = {
            airPressure: 'hPa',
            soilMoisture: '%',
            temperature: '°C',
            humidity: '%',
            pressureLevel: 'kPa',
            ultraSoundLevel: 'm',
        };

        return parameter ? unitMap[parameter] || '' : '';
    };

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                console.log(`Fetching data for ${parameter}...`);
                const monitoringData = await fetchMonitoring();
                console.log(`Got monitoring data:`, monitoringData);
                
                if (monitoringData && Array.isArray(monitoringData) && monitoringData.length > 0) {
                    const latestData = monitoringData[0];
                    console.log(`Latest data entry:`, latestData);
                    
                    if (latestData[parameter] !== undefined) {
                        const formattedValue = formatParameterValue(latestData[parameter]);
                        setParamValue(formattedValue);
                        console.log(`Set ${parameter} value to: ${formattedValue}`);
                    } else {
                        setParamValue('Ej tillgänglig');
                        console.log(`No ${parameter} value found in data`);
                    }
                    
                    if (latestData.timestamp) {
                        setTimestamp(latestData.timestamp);
                    } else {
                        setTimestamp('Ingen tid');
                    }
                } else {
                    console.log('No data from API');
                    setParamValue('Ej tillgänglig');
                    setTimestamp('Ingen tid');
                }
            } catch (err) {
                console.error(`Error fetching data for ${parameter}:`, err);
                setError(err.message);
                setParamValue('Fel');
                setTimestamp('Ingen tid');
            } finally {
                setLoading(false);
            }
        };

        if (parameter) {
            getData();
        }
    }, [parameter]);

    return (
        <View
            style={[
                styles.card,
                { backgroundColor: theme.card },
                width ? { width } : {},
                height ? { height } : { aspectRatio: 1 },
            ]}
        >
            <View style={styles.headerContainer}>
                {getParameterIcon() && (
                    <MaterialCommunityIcons
                        name={getParameterIcon()}
                        size={24}
                        color={titleColor || theme.textPrimary}
                        style={{ marginBottom: 8 }}
                    />
                )}
                <Text style={[styles.title, { color: titleColor || theme.textPrimary }]}>
                    {title}
                </Text>
            </View>

            {image && (
                <Image
                    source={image}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}

            {loading ? (
                <Text style={{ color: theme.textPrimary }}>Laddar...</Text>
            ) : error ? (
                <View style={styles.dataContainer}>
                    <Text style={[styles.valueText, { color: valueColor || theme.textPrimary }]}>
                        {paramValue} {getParameterUnit()}
                    </Text>
                    <Text style={[styles.timestamp, { color: timestampColor || theme.textSecondary}]}>
                        {timestamp}
                    </Text>
                </View>
            ) : (
                <View style={styles.dataContainer}>
                    <Text style={[styles.valueText, { color: valueColor || theme.textPrimary }]}>
                        {paramValue} {getParameterUnit()}
                    </Text>
                    <Text style={[styles.timestamp, { color: timestampColor || theme.textSecondary }]}>
                        {timestamp}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default WaterLevelCard;

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        aspectRatio: 1,
        borderRadius: 8,
        margin: 8,
        padding: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 8,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    image: {
        width: 60,
        height: 60,
        marginBottom: 8,
    },
    dataContainer: {
        alignItems: 'center',
        marginTop: 4,
    },
    valueText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    timestamp: {
        fontSize: 12,
        marginTop: 4,
    },
});