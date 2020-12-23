"use strict";

// Main Hub Application
// Logs every event to the console with a timestamp and the event payload
// i.e. "EVENT {}"

// const events = require('../events.js');

// require('../vendor/vendor.js');
// require('../driver/driver.js');

// events.on('pickup', (payload) => {
//   let time = new Date();
//   let event = {
//     time: time,
//     payload: payload
//   }
//   console.log('Pickup', event)
// })

const port = 3001;
const store = "1-206-flowers";

const io = require("socket.io")(port);

io.on("connection", (socket) => {
  console.log("CONNECTED", socket.id);

  socket.on("pickup", (payload) => {
    console.log("SERVER EVENT: pickup", payload.orderId);
  });
  socket.on("in-transit", (payload) => {
    console.log("SERVER EVENT: in-transit", payload.orderId);
  });
  socket.on("delivered", (payload) => {
    console.log("SERVER EVENT: delivered", payload.orderId);
  });
});

const caps = io.of("/caps");
caps.on("connection", (socket) => {
  socket.on("join", (room) => {
    const validator = [store];
    if (validator.includes(room)) {
      console.log("Welcome to", room);
      socket.join(room);
    }
  });

  socket.on("pickup", (payload) => {
    caps.emit("pickup", payload);
  });
  socket.on("in-transit", (payload) => {
    caps.emit("in-transit", payload);
  });
  socket.on("delivered", (payload) => {
    caps.emit("delivered", payload);
  })

});
