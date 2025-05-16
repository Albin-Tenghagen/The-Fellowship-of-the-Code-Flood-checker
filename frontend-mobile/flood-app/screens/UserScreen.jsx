import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import WorkerStatus from '../components/WorkerStatus'
// import MapScreen from '../components/MapScreen'
// import * as Location from 'expo-location'
import FlatListLocation from '../components/FlatListLocation';

const UserScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.statusContainer}>
        <FlatListLocation onLocationSelect={setSelectedLocation}/>
      </View>
      
        <View style={styles.statusContainer}>
          <WorkerStatus locationData={selectedLocation}/>
        </View>
     
      
      {/* <View style={styles.mapContainer}>
        <MapScreen />
      </View> */}
      </ScrollView>
    </View>
  );
};

export default UserScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  listContainer: {
    zIndex: 2,
  },
  statusContainer: {
    flex: 1,
    zIndex: 1,
  },
  // mapContainer: {
  //   flex: 1,
  // }
})