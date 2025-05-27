import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WorkerStatus from '../components/WorkerStatus'
import MapScreen from '../components/MapScreen'
import * as Location from 'expo-location'
import InfrastructureIssuesCard from '../components/InfrastructureIssuesCard'

const UserScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <WorkerStatus />
      </View>
      <InfrastructureIssuesCard
          title="Aktuella problem"
          width="90%"
          maxItems={1}
        />
      {/* <View style={styles.mapContainer}>
        <MapScreen />
      </View> */}
    </View>

    
  )
}

export default UserScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusContainer: {
    zIndex: 1,
  },
  mapContainer: {
    flex: 1,
  }
})