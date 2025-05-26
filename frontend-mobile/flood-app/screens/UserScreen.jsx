import { ScrollView, StyleSheet, Text, View } from 'react-native'
import AnimatedButton from '../components/AnimatedButton';
import { useAuth } from '../context/AuthContext';
import PickLocation from '../components/PickLocation';


const UserScreen = () => {
  const { logout } = useAuth();
  

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <View style={styles.statusContainer}>
        <AnimatedButton style={styles.button} title="Logga ut" onPress={logout}/>
        

        <PickLocation />
      </View>
    </ScrollView>
  );
};

export default UserScreen

const styles = StyleSheet.create({

  scroll: {
    flex:1,
    backgroundColor: '#fff',
  },
  container: {
   
    padding: 16,
  },
  button: {
    marginBottom: 20,
  }
  // statusContainer: {
  //   flex: 1,
  //   zIndex: 1,
  // },
  // mapContainer: {
  //   flex: 1,
  // }
})

