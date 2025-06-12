import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, Alert, TextInput, Modal } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

export default function MapScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isAddingMarker, setIsAddingMarker] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [newMarkerCoordinate, setNewMarkerCoordinate] = useState(null);
    const [markerTitle, setMarkerTitle] = useState('');
    const [markerDescription, setMarkerDescription] = useState('');
    const [currentDelta, setCurrentDelta] = useState({ latitudeDelta: 0.6, longitudeDelta: 0.6 });
    const mapRef = useRef(null);

    const [markers, setMarkers] = useState([
        {
            id: 1,
            coordinate: {
                latitude: 58.5333,
                longitude: 15.6167,
            },
            title: 'Sjön Roxen',
            description: 'En stor sjö norr om Linköping, populär för fiske och båtliv.',
            type: 'default'
        },
        {
            id: 2,
            coordinate: {
                latitude: 58.2667,
                longitude: 15.6833,
            },
            title: 'Sjön Rängen',
            description: 'Känd för sitt klara vatten och natursköna omgivningar.',
            type: 'default'
        },
        {
            id: 3,
            coordinate: {
                latitude: 58.2333,
                longitude: 15.6167,
            },
            title: 'Sjön Järnlunden',
            description: 'Läge sydost om Linköping, erbjuder fiske och naturupplevelser.',
            type: 'default'
        },
        {
            id: 4,
            coordinate: {
                latitude: 58.4109,
                longitude: 15.6216,
            },
            title: 'Stångån / Kinda kanal',
            description: 'Flödar genom Linköping och ingår i Kinda kanal, populär för båtturer.',
            type: 'default'
        },
        {
            id: 5,
            coordinate: {
                latitude: 58.4000,
                longitude: 15.7000,
            },
            title: 'Svartån',
            description: 'Rinner ut i Roxen och är känd för sin vackra natur.',
            type: 'default'
        },
        {
            id: 6,
            coordinate: {
                latitude: 58.5500,
                longitude: 15.3000,
            },
            title: 'Motala ström',
            description: 'Förbinder Vättern med Östersjön, passerar genom Roxen.',
            type: 'default'
        },
    ]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            try {
    
                let location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                    timeout: 10000,
                    maximumAge: 60000,
                });

                console.log('Got location:', location.coords);
                setLocation(location);
            } catch (error) {
                console.log('Location error:', error);
                setErrorMsg('Could not get location: ' + error.message);
            }
        })();
    }, []);

    const goToCurrentLocation = () => {
        if (location && mapRef.current) {
            const lat = location.coords.latitude;
            const lng = location.coords.longitude;
            const isInSweden = lat >= 55.3 && lat <= 69.0 && lng >= 11.0 && lng <= 24.2;

            if (!isInSweden) {
                console.log('Location outside Sweden:', lat, lng);

                mapRef.current.animateToRegion({
                    latitude: 58.4109,
                    longitude: 15.6216,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                });
            } else {
                mapRef.current.animateToRegion({
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                });
            }
        } else {
            mapRef.current.animateToRegion({
                latitude: 58.4109,
                longitude: 15.6216,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            });
        }
    };

    const handleMapPress = (event) => {
        if (isAddingMarker) {
            const coordinate = event.nativeEvent.coordinate;
            setNewMarkerCoordinate(coordinate);
            setModalVisible(true);
        }
    };

    const toggleAddMarkerMode = () => {
        setIsAddingMarker(!isAddingMarker);
        if (!isAddingMarker) {

        }
    };

    const addNewMarker = () => {
        if (newMarkerCoordinate && markerTitle.trim()) {
            const newId = Math.max(...markers.map(m => m.id)) + 1;
            const newMarker = {
                id: newId,
                coordinate: newMarkerCoordinate,
                title: markerTitle.trim(),
                description: markerDescription.trim() || 'Användardefinierad markör',
                type: 'user'
            };

            setMarkers([...markers, newMarker]);
            setModalVisible(false);
            setIsAddingMarker(false);
            setMarkerTitle('');
            setMarkerDescription('');
            setNewMarkerCoordinate(null);
        } else {
            Alert.alert("Fel", "Vänligen ange minst en titel för markören");
        }
    };

    const cancelAddMarker = () => {
        setModalVisible(false);
        setIsAddingMarker(false);
        setMarkerTitle('');
        setMarkerDescription('');
        setNewMarkerCoordinate(null);
    };

    const deleteMarker = (markerId) => {
        const marker = markers.find(m => m.id === markerId);
        if (marker && marker.type === 'user') {
            setMarkers(markers.filter(m => m.id !== markerId));
        }
    };

    const zoomOut = () => {
        if (mapRef.current) {

            mapRef.current.getCamera().then(camera => {
 
                const newLatDelta = currentDelta.latitudeDelta * 2;
                const newLngDelta = currentDelta.longitudeDelta * 2;

                const maxLatDelta = 14;
                const maxLngDelta = 14;

                const constrainedLatDelta = Math.min(newLatDelta, maxLatDelta);
                const constrainedLngDelta = Math.min(newLngDelta, maxLngDelta);

                setCurrentDelta({
                    latitudeDelta: constrainedLatDelta,
                    longitudeDelta: constrainedLngDelta
                });

                mapRef.current.animateToRegion({
                    latitude: camera.center.latitude,
                    longitude: camera.center.longitude,
                    latitudeDelta: constrainedLatDelta,
                    longitudeDelta: constrainedLngDelta
                });
            });
        }
    };

    const zoomIn = () => {
        if (mapRef.current) {

            mapRef.current.getCamera().then(camera => {

                const newLatDelta = currentDelta.latitudeDelta / 2;
                const newLngDelta = currentDelta.longitudeDelta / 2;

                const minLatDelta = 0.005;
                const minLngDelta = 0.005;

                const constrainedLatDelta = Math.max(newLatDelta, minLatDelta);
                const constrainedLngDelta = Math.max(newLngDelta, minLngDelta);

                setCurrentDelta({
                    latitudeDelta: constrainedLatDelta,
                    longitudeDelta: constrainedLngDelta
                });

                mapRef.current.animateToRegion({
                    latitude: camera.center.latitude,
                    longitude: camera.center.longitude,
                    latitudeDelta: constrainedLatDelta,
                    longitudeDelta: constrainedLngDelta
                });
            });
        }
    };

    const onRegionChangeComplete = (region) => {
        setCurrentDelta({
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta
        });
    };

    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 58.4109,
                    longitude: 15.6216,
                    latitudeDelta: 0.6,
                    longitudeDelta: 0.6,
                }}
                showsUserLocation={true}
                showsMyLocationButton={false}
                onPress={handleMapPress}
                onRegionChangeComplete={onRegionChangeComplete}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                        pinColor={marker.type === 'user' ? '#b85151' : '#3c7fc8'}
                    >
                        <Callout>
                            <View style={styles.callout}>
                                <Text style={styles.calloutTitle}>{marker.title}</Text>
                                <Text style={styles.calloutDescription}>{marker.description}</Text>
                                {marker.type === 'user' && (
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => deleteMarker(marker.id)}
                                    >
                                        <MaterialIcons name="delete" size={20} color="#FF6B6B" />
                                        <Text style={styles.deleteButtonText}>Ta bort</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>

            <View style={styles.zoomContainer}>
                <TouchableOpacity
                    style={styles.zoomButton}
                    onPress={zoomIn}
                >
                    <MaterialIcons name="add" size={24} color="white" />
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.zoomButton}
                    onPress={zoomOut}
                >
                    <MaterialIcons name="remove" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.actionButton, isAddingMarker && styles.activeButton]}
                    onPress={toggleAddMarkerMode}
                >
                    <MaterialIcons
                        name={isAddingMarker ? "close" : "add-location"}
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.locationButton} onPress={goToCurrentLocation}>
                    <MaterialIcons name="my-location" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={cancelAddMarker}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Lägg till ny markör</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Titel (obligatorisk)"
                            value={markerTitle}
                            onChangeText={setMarkerTitle}
                            maxLength={50}
                        />

                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Beskrivning (valfritt)"
                            value={markerDescription}
                            onChangeText={setMarkerDescription}
                            multiline={true}
                            numberOfLines={3}
                            maxLength={200}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={cancelAddMarker}
                            >
                                <Text style={styles.cancelButtonText}>Avbryt</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={addNewMarker}
                            >
                                <Text style={styles.saveButtonText}>Spara</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {isAddingMarker && (
                <View style={styles.instructionOverlay}>
                    <Text style={styles.instructionText}>
                        Tryck på kartan för att lägga till en markör
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    callout: {
        padding: 10,
        maxWidth: 200,
        minWidth: 150,
    },
    calloutTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 16,
    },
    calloutDescription: {
        fontSize: 14,
        marginBottom: 10,
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        paddingVertical: 5,
    },
    deleteButtonText: {
        color: '#b85151',
        marginLeft: 5,
        fontWeight: 'bold',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'column',
        gap: 10,
    },
    actionButton: {
        backgroundColor: '#3c7fc8',
        padding: 12,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    activeButton: {
        backgroundColor: '#b85151',
    },
    locationButton: {
        backgroundColor: '#3c7fc8',
        padding: 12,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    // New styles for zoom buttons
    zoomContainer: {
        position: 'absolute',
        left: 20,
        top: 100,
        flexDirection: 'column',
        gap: 10,
    },
    zoomButton: {
        backgroundColor: '#3c7fc8',
        padding: 12,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        margin: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        margin: 20,
        width: '90%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    saveButton: {
        backgroundColor: '#3c7fc8',
    },
    cancelButtonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    saveButtonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    instructionOverlay: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 15,
        borderRadius: 10,
    },
    instructionText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});