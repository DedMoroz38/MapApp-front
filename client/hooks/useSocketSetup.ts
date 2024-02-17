import { useEffect } from "react";
import * as Location from 'expo-location';
import { io } from 'socket.io-client';
import { Region } from "./useUpdateLocation";


export const useSocketSetup = (region: Region) => {
  const socket = io('http://192.168.1.111:4000', { transports: ['websocket'] });
    
  useEffect(() => {
    region &&
      socket.emit('locationData', region);
  }, [region])

  useEffect(() => {
    socket.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
}