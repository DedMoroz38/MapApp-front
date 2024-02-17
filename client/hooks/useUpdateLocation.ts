import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export type Region = {
  timestamp: number
  mocked: false,
  coords: {
    altitude: number
    heading: number
    altitudeAccuracy: number
    latitude: number
    speed: number
    longitude: number
    accuracy: number
  }
} | null

export const useUpdateLocation = () => {
  const [region, setRegion] = useState<Region>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let locationSubscriber = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 1
      }, (newLocation) => {
        setRegion(newLocation as Region);
      });

      return () => {
        locationSubscriber.remove();
      };
    })();
  }, []);

  return {region}
}