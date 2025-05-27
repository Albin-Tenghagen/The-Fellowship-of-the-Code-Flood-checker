import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapScreen from '../components/MapScreen'

const Location = () => {
  return (
    <View style={styles.container}>
      <MapScreen style={styles.mapScreen} />
    </View>
  )
}

export default Location

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Optional background color
  },
  mapScreen: {
    flex: 1,
  },
})