import { useEffect } from "react";
import * as Location from 'expo-location';
import { io } from 'socket.io-client';


export const useSocketSetup = () => {
  const socket = io('http://192.168.1.111:4000', { transports: ['websocket'] });

  const startLocationUpdate = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 0,
          timeInterval: 5000,
        },
        (location) => {
          socket.emit('locationData', location);
          console.log(location);
        }
      );
    })();
  }

  useEffect(() => {
    socket.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });
    startLocationUpdate();

    return () => {
      socket.disconnect();
    };
  }, []);
}