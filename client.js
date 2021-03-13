const WebSocket = require('ws');

console.clear();
const ws = new WebSocket('ws://127.0.0.9:3019', {
  perMessageDeflate: false
});

ws.on('open', function open() {
  console.log('\x1b[30m\x1b[44m%s\x1b[0m', ' Web Socket Client running ... ');
  ws.send('Hello, Server!');
});

ws.on('message', function incoming(msg) {
  ws.send(msg);
});

