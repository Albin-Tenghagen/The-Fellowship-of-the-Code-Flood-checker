import { StyleSheet, Animated } from 'react-native'
import React from 'react'

const HeroAnimated = ({style}) => {
  return (
   <Animated.Image
   source={require("../assets/images/her1.jpg")}
    style={[styles.image, style]}
    resizeMode="cover"/>
  )
}

export default HeroAnimated

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 200,
        borderRadius: 8,
        marginBottom: 50
      }
    
})