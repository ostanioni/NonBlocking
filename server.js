import {createServer} from 'http'
import WebSocket from 'ws'

// const {readFileSync} = require('fs');
// const https = require('https');

console.clear();
/*
const httpsServerOptions = {
  hostname: '127.0.0.9',
  port: 443,
  // path: '/',
  // method: 'GET',
  cert: readFileSync('./cert/cert.pem'),
  key: readFileSync('./cert/key.pem')
};
*/
const httpServerOptions = {
  hostname: '127.0.0.9',
  port: 3009,
  // path: '/',
  // method: 'GET',
}
const httpServer = createServer(httpServerOptions);

const wsServerOptions = {
  host: '127.0.0.9',
  port: 3019,
  server: httpServer
}
const wsServer = new WebSocket.Server(wsServerOptions);

wsServer.on('connection', function connection(ws) {
  ws.on('message', function incoming(msg) {
    ws.send(msg);
    // console.log('received: %s', message);
  });

  ws.send('Hello, client');
});

console.log('\x1b[0m\x1b[42m\x1b[30m%s\x1b[0m', ' Web Socket Server running ... ');
