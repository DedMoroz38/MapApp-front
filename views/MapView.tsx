import React, { useEffect } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { io } from 'socket.io-client';
import { useSocketSetup } from '../hooka/useSocketSetup';

const MyMap = () => {
  useSocketSetup()

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default MyMap;