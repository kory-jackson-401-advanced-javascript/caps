"use strict";

// Global Event Pool (shared by all modules)

const Events = require('events');

const events = new Events();

module.exports = events;