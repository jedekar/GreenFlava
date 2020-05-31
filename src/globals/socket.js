const openSocket = require("socket.io-client");
let socket = openSocket("localhost:5000");

module.exports = socket;
