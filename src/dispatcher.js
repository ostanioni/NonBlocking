import Emitter from './emitter.js'
import {eachBlocking} from './loops.js'
import log from './logger.js'
console.clear()

const begin = hrTime()

const loopConfig = {
  'N': 10000,
  'divisor': 1000,
  'Emitter': Emitter,
  'time': begin
}

on('syncStart', () => {
  log('m', 'Sync start: 0 μs ')
})
on('syncEnd', () => {
  log('m', `Sync end:  ${diffTime(begin)}  `)
})
on('sync', () => {
  log('b','--sync--')
})
on('async', () => {
  log('g','Async event: ', diffTime(begin));
  log('c','Time took: ', diffTime(begin));
});

eachBlocking(loopConfig)

function on(event,func){
  Emitter.on(event,func)
}

function hrTime(){
  return Math.round(Number(process.hrtime.bigint()) / 10000)
}
function diffTime(begin){
  return (hrTime() - begin).toString() + 'μs'
}