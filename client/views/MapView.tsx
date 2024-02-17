import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { useSocketSetup } from '../hooks/useSocketSetup';
import { useUpdateLocation } from '../hooks/useUpdateLocation';


const Map = () => {
  const {region} = useUpdateLocation()
  useSocketSetup(region);

  return (
    <View style={{ flex: 1 }}>
      {
        region &&
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: region.coords.latitude,
            longitude: region.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        />
      }
    </View>
  );
};

export default Map;