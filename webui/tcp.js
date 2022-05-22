const Net = require('net');
// The port number and hostname of the server.
const port = 36616;
const host = 'host.docker.internal';
const client = new Net.Socket();
var users

function communicate(request) {
  let response = null
  client.connect({ port: port, host: host }, function() {
    // If there is no error, the server has accepted the request and created a new 
    // socket dedicated to us.
    console.log('TCP connection established with the server.');

    // The client can now send data to the server by writing to its socket.
    client.write(JSON.stringify(request));
  });

  // The client can also receive data from the server by reading from its socket.
  client.once('data', function(chunk) {
      console.log(`Data received from the server: ${chunk.toString()}.`);
      response = JSON.parse(chunk.toString())
      // Request an end to the connection after the data has been received.
      client.end();
  });

  client.on('end', function() {
      console.log('Requested an end to the TCP connection');
      return response
  });
  
}

function render_res(request, res) {
  let response = null
  client.connect({ port: port, host: host }, function() {
    // If there is no error, the server has accepted the request and created a new 
    // socket dedicated to us.
    console.log('TCP connection established with the server.');

    // The client can now send data to the server by writing to its socket.
    client.write(JSON.stringify(request));
  });

  // The client can also receive data from the server by reading from its socket.
  client.once('data', function(chunk) {
      console.log(`Data received from the server: ${chunk.toString()}.`);
      users = JSON.parse(chunk.toString())
      res.render('todo.ejs', {users: JSON.parse(chunk.toString()), messages: null})
      // Request an end to the connection after the data has been received.
      client.end();
  });

  client.on('end', function() {
      console.log('Requested an end to the TCP connection');
      return response
  });
  
}

function render_res_deep(request, res) {
  let response = null
  client.connect({ port: port, host: host }, function() {
    // If there is no error, the server has accepted the request and created a new 
    // socket dedicated to us.
    console.log('TCP connection established with the server.');

    // The client can now send data to the server by writing to its socket.
    client.write(JSON.stringify(request));
  });

  // The client can also receive data from the server by reading from its socket.
  client.once('data', function(chunk) {
      console.log(`Data received from the server: ${chunk.toString()}.`);
      users = JSON.parse(chunk.toString())
      res.render('todo.ejs', {messages: JSON.parse(chunk.toString()), users: users})
      // Request an end to the connection after the data has been received.
      client.end();
  });

  client.on('end', function() {
      console.log('Requested an end to the TCP connection');
      return response
  });
  
}

module.exports = {
    addUser: function (id, nickname, hashed_pwd) {
      user = {
        _id: id,
        nickname: nickname,
        hashed_pwd: hashed_pwd
      }

      request = {
        command: "addUser",
        metadata: JSON.stringify(user)
      }

      return communicate(request)
    },

    getUsers: function (res) {
      request = {
        command: "getUsers",
      }
      render_res(request, res)
    },

    sendMessage: function (adress, destination, message) {
      message = {
        adress: adress,
        destination: destination,
        message: message
      }

      request = {
        command: "sendMessage",
        metadata: JSON.stringify(message)
      }

      return communicate(request)
    },

    recieveMessages: function (adress, destination, res) {
      request = {
        command: "getMessages",
        from: adress,
        to: destination
      }
      render_res_deep(request, res)
    }
};