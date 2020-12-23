"use strict";

/*
  - Monitor the system for events …
  - On the ‘pickup’ event …
    - Wait 1 second
      - Log “DRIVER: picked up [ORDER_ID]” to the console.
      - Emit an ‘in-transit’ event with the payload you received
    - Wait 3 seconds
      - Log “delivered” to the console
      - Emit a ‘delivered’ event with the same payload
*/

const io = require("socket.io-client");

let host = "http://localhost:3001";
let store = "1-206-flowers";

const events = io.connect(host);
const capsConnection = io.connect(`${host}/caps`);

capsConnection.emit("join", store);

capsConnection.on("pickup", (payload) => {
  setTimeout(() => {
    console.log("DRIVER: picked up", payload);
    events.emit("in-transit", payload);
    capsConnection.emit("in-transit", payload);
  }, 1500);
});

capsConnection.on("in-transit", (payload) => {
  setTimeout(() => {
    console.log("DRIVER: delivered", payload.orderId)
    events.emit("delivered", payload);
    capsConnection.emit("delivered", payload);
  }, 3000);
});
