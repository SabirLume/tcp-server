# tcp-server

A simple TCP server project.

-Client 
* Sends data via TCP to server 
* Waits for a response

- TCP Server 
* TCP Socket is open and server waits for any incoming connections, on specific port and host

- TCP Proxy
* Proxy takes TCP data and transforms it and then makes a HTTP Request to  HTTP Server

- HTTP Server 
* Receives incoming request from Proxy and sends back response to Proxy
