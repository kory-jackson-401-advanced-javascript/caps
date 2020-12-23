"use strict";

// Main Hub Application
// Logs every event to the console with a timestamp and the event payload
// i.e. "EVENT {}"

const events = require('./events.js');

require('./vendor.js');
require('./driver.js');

events.on('pickup', (payload) => {
  let time = new Date();
  let event = {
    time: time, 
    payload: payload
  }
  console.log('Pickup', event)
})