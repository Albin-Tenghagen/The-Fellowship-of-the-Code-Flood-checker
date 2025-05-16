import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useTheme } from '../themes/ThemeContext';


const CheckBox = ({ title, isChecked, onPress}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          
            <BouncyCheckbox
            isChecked={isChecked}
            onPress={onPress}
            fillColor={theme.accent}
            innerIconStyle={{ borderWidth: 3 }}
        

        />
            <Text style={styles.label}>{title}</Text>
        </View>
    </View>
  );
};

export default CheckBox

const createStyles = (theme) => 
  StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  
   
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingVertical: 1,
    paddingTop:3,
  
  
  
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 5,
    color: theme.textTertiary,
    fontSize: 25,
    
  },
});