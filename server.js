const WebSocket = require('ws');

console.clear();
const wss = new WebSocket.Server({ 
  port: 3009,
  host: '127.0.0.9'
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(msg) {
    ws.send(msg);
    // console.log('received: %s', message);
  });

  ws.send('Hello, client');
});
console.log('\x1b[0m\x1b[42m\x1b[30m%s\x1b[0m', ' Web Socket Server running ... ');
// console.log(wss.address())