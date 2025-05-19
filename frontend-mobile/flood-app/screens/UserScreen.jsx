import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import WorkerStatus from '../components/WorkerStatus'
// import MapScreen from '../components/MapScreen'
// import * as Location from 'expo-location'
import FlatListLocation from '../components/FlatListLocation';
import AnimatedButton from '../components/AnimatedButton';

const UserScreen = () => {
  const [selectedData, setSelectedData] = useState(null);
  const { logout } = useAuth();
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.statusContainer}>
        <AnimatedButton style={styles.button} onPress={logout}>
          <Text>Logga ut</Text>
        </AnimatedButton>
        <FlatListLocation onSend={setSelectedData}/>
        {selectedData && ( 
        <WorkerStatus data={selectedData}/>
        )}
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