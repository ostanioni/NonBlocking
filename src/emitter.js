// const { EventEmitter, errorMonitor } = require('events');
import {EventEmitter, errorMonitor} from 'events'
import log from './logger.js'

// class MyEmitter extends EventEmitter {}

const Emitter = new EventEmitter()

Emitter.on(errorMonitor, (err) => {
  log('r', err);
})

export default Emitter