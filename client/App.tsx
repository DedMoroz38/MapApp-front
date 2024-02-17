import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Map from './views/MapView';

export default function App() {

  return (
    <>
      <Text style={styles.title}>Location Emitter</Text>
      <Map />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 40,
    fontSize: 30,
    textAlign: 'center'
  },
});