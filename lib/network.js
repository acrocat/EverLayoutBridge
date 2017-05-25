// Load the TCP Library
var net = require('net');

var network = {
  clients : [],
  createServer : function (port) {
    net.createServer(function(socket){
      // Identify this client
      socket.name = socket.remoteAddress + ":" + socket.remotePort 

      // Put this new client in the list
      network.clients.push(socket);

      console.log("Connected to: " + socket.name);

      // Handle incoming messages from clients.
      // socket.on('data', function (data) {
      //   broadcast(socket.name + "> " + data, socket);
      // });

      // Remove the client from the list when it leaves
      socket.on('end', function () {
        network.clients.splice(clients.indexOf(socket), 1);
        console.log(socket.name  + " disconnected");
      });
    }).listen(port);
  },
  sendData : function (data) {
    network.clients.forEach(function (client) {
      // Don't want to send it to sender

      // client.write(JSON.stringify(data));
      client.write(data);
    });
  }
};

// Keep track of the chat clients
var clients = [];

// Start a TCP Server
net.createServer(function (socket) {
  
  // Send a message to all clients
  function broadcast(message, sender) {
    clients.forEach(function (client) {
      // Don't want to send it to sender
      if (client === sender) return;
      client.write(message);
    });
    // Log it to the server output too
    process.stdout.write(message)
  }

}).listen(3000);

module.exports = network;