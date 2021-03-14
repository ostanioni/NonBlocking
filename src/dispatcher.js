import Emitter from './emitter.js'
import {eachBlocking} from './loops.js'
console.clear()

const N = 10000
const divisor = 1000

const begin = hrTime()
eachBlocking(N, divisor, Emitter)

on('start', () => {
  log('m', 'Start ...')
})
on('end', () => {
  log('m', 'End ...')
})
on('sync', () => {
  log('b','Sync ...')
})
on('async', () => {
  log('g','async event occurred!');
  const diff = hrTime() - begin 
  log('m','Time took: ', diff.toString(),'ms');
});


















function on(event,func){
  Emitter.on(event,func)
}
function log(color,...msgs){
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let msg = msgs.reduce(reducer)
  //let color = ''
  switch(color){
    case 'r': color = '\x1b[0m\x1b[41m\x1b[37m%s\x1b[0m';break;
    case 'g': color = '\x1b[0m\x1b[42m\x1b[30m%s\x1b[0m';break;
    case 'b': color = '\x1b[0m\x1b[44m\x1b[30m%s\x1b[0m';break;
    case 'y': color = '\x1b[0m\x1b[43m\x1b[30m%s\x1b[0m';break;
    case 'm': color = '\x1b[0m\x1b[45m\x1b[37m%s\x1b[0m';break;
    case 'c': color = '\x1b[0m\x1b[46m\x1b[30m%s\x1b[0m';break;
    default: break;
  }
  console.log(color,msg)
}
function hrTime(){
  return process.hrtime.bigint() / 1000000n
}