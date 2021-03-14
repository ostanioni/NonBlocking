import EventEmitter from 'events'

class MyEmitter extends EventEmitter {}
const Emitter = new MyEmitter()

export default Emitter