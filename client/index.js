const net = require('net');
const host = 'localhost';
const port = 8090;


const client = new net.Socket();

client.connect(port, host, () => {

  console.log("we have connected to the server")

  client.write('Hello from the client!', 'utf8');
});

client.on('data', (data) => {
  console.log('Received Data from the server', data)
})

client.on('end', () => {
  console.log("We have disconnected from the server!")
})
console.log('Hello from Node.js!');

