import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context'

const FontComponent = () => {
    const [titleText, setTitleText] = useState("Exempeltext");
    const bodyText = 'This is not really a bird nest.';
    const onPressTitle = () => {
      setTitleText("Test [pressed]");
    };

  return (
   <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Text>
      <Text style={styles.titleText} onPress={onPressTitle}>
        {titleText}
        {'\n'}
        {'\n'}
      </Text>
      <Text numberOfLines={5}>{bodyText}</Text>
      </Text>
    </SafeAreaView>
   </SafeAreaProvider>>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // baseText: {
  //   fontFamily: ?
  // },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});


export default FontComponent

