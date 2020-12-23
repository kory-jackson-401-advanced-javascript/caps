"use strict";

/*
  - Declare your store name(.env file so I can re-use it);
  - Every 5 seconds, simulate a new customer order
    - Create a fake order, as an object:
      - storeName, orderId, customerName, address
    - Emit a ‘pickup’ event and attach the fake order as payload
      - HINT: Have some fun by using the faker library to make up phony information
  - Monitor the system for events …
    - Whenever the ‘delivered’ event occurs
      - Log “thank you” to the console
*/
const io = require("socket.io-client");

let host = "http://localhost:3001";
let store = "1-206-flowers";

const events = io.connect(host);
const capsConnection = io.connect(`${host}/caps`);
const faker = require("faker");

capsConnection.emit("join", store);

setInterval(() => {
  let id = Math.ceil(Math.random() * 10000);
  let order = {
    storeName: store,
    orderId: id,
    cutomerName: faker.name.findName(),
    address: `${faker.address.streetAddress()} | ${faker.address.city()}, ${faker.address.state()}`,
  };

  console.log("EVENT: Order place", order);
  events.emit("pickup", order);
  capsConnection.emit("pickup", order);
}, 5000);

setTimeout(() => {
  capsConnection.on("delivered", (payload) => {
    console.log("VENDOR: Thank you for delivering", payload.orderId);
  });
}, 1000);
