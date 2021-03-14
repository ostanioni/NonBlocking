import Emitter from './emitter.js'
import {eachBlocking} from './loops.js';

const N = 10000
const divisor = 100
console.clear()

const begin = process.hrtime.bigint()
eachBlocking(N, divisor, Emitter)

Emitter.on('start', () => {
  console.log('Start ...')
})
Emitter.on('end', () => {
  console.log('End ...')
})
Emitter.on('sync', () => {
  console.log('Sync ...')
})
Emitter.on('async', () => {
  console.log('\x1b[0m\x1b[42m\x1b[30m%s\x1b[0m','async event occurred!');
  const diff = (process.hrtime.bigint() - begin) / 1000000n
  console.log('Time took:', diff.toString(),'ms');
});