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

const events = require("./events.js");
const faker = require("faker");

setInterval(() => {
  let id = Math.ceil(Math.random() * 10000);
  let order = {
    storeName: "Jackson's",
    orderId: id,
    cutomerName: faker.name.findName(),
    address: `${faker.address.streetAddress()} | ${faker.address.city()}, ${faker.address.state()}`,
  };

  events.emit("pickup", order);
}, 5000);

events.on("delivered", (payload) => {
  console.log("VENDOR: Thank you for delivering", payload.orderId);
});
