const net = require('net');
const http = require('http');
const port = 8090;
const localhost = 'localhost'

const tcpServer = net.createServer((socket) => {
  console.log('Server: Client connected to server')

  socket.setEncoding('utf-8')
  socket.on('data', (data) => {
    console.log('Streaming Data to Proxy', data);
    socket.write(data.toString().toUpperCase());
    httpProxy(data, socket);
  })

  socket.on('end', () => {
    console.log("Server ending")
  })
})

tcpServer.on('error', (err) => {
  console.error('error with tcp server', err.message)
})

tcpServer.listen(port, () => {
  console.log('listening on port', port)
})

const httpProxy = (data, socket) => {
  console.log(Buffer.byteLength(data))

  const options = {
    hostname: localhost,
    port: 8070,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
    },
  };

  const req = http.request(options, (res) => {
    let response = '';

    // res.on() just listening for responses
    res.on('data', (chunks) => {
      console.log("Chunking data")
      response += chunks;
    })

    res.on('end', () => {
      console.log("writing data to TCP server")
      socket.write(response);
    })

    res.on('error', (e) => {
      console.error("There was an error in the proxy", e.message)
    })
  })

  // writing to the HTTP server
  req.write(data);
  req.end()
}

const httpServer = http.createServer((req, res) => {
  console.log('HTTP Response Status:', res.statusCode);  // Log status
  let response = '';
  req.on('data', (chunks) => {
    console.log("Chunking data");
    if (typeof chunks === 'string') {
      response += chunks;
    } else {
      response += chunks;
      console.log("Warning: httpData type not string")
    }

  });

  req.on('end', () => {
    console.log("Sending data to Proxy", response);
    res.writeHead(res.statusCode, { 'Content-type': 'application/json' })
    res.write(response);
    res.end();
  });

  req.on('error', (e) => {
    console.log("There was an error in the HTTP server", e.message)
  })

})

httpServer.listen(8070, () => {
  console.log("listening on port", 8070)
})
