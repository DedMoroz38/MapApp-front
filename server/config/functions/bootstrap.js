'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = async () => {
  const io = require('socket.io')(strapi.server);
  strapi.io = io; 

  console.log('socket.io initialized')

  io.on('connection', function (socket) {
    socket.on('locationData', async (locationRecord) => {
      console.log('Location data received: ', locationRecord);
      try {
        const {
          coords: {latitude, longitude, altitude, accuracy, altitudeAccuracy, heading},
          speed,
          timestamp
        } = locationRecord
        
        await strapi.query('location-records').create({
          latitude, 
          longitude, 
          altitude, 
          accuracy, 
          altitudeAccuracy, 
          heading, 
          speed, 
          timestamp, 
        });
      } catch (error) {
        console.error('Error creating record in Strapi: ', error);
      }
    });
  });
};