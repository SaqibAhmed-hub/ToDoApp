import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

const Splash = ({ navigation }) => {

  useEffect(()=> {
    setTimeout(() => {
      navigation.replace('HomeScreen');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        hidden={true}
      />
      <Text style={styles.text}>TODO App</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0080ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: '600'
  }

});



export default Splash;