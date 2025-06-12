import React from 'react'
import { StyleSheet, Image, View } from 'react-native'

const HeroImage = () => {
  return (
    <View style={styles.container}>
        <Image
         source={require("../assets/images/hero1.jpg")}
            style={styles.image}
            resizeMode="cover"/>
    </View>
  )
}

export default HeroImage

const styles = StyleSheet.create({
    container: {
        width:"100%",
        height: 250
    },
    image: {
        width: "100%",
        height: "100%"
    }
})