const EventEmitter = require('events');
console.clear();

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

setTimeout(()=>myEmitter.emit('event'),3000)
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
