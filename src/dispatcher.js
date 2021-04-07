import Emitter from './emitter.js'
import log from './logger.js'
import {  eachBlocking, 
          eachNonBlocking,
          forBlocking,
          forNonBlocking,
          eachOpt,
          forOpt
        } from './loops.js'

console.clear()
// high resolution time 
const begin = hrTime()


on('loopStart', (...args) => {
  let msg = args.join('')
  log('m', msg, `Loop start: ${diffTime(begin)} `)
})
on('loopEnd', (...args) => {
  let msg = args.join('')
  log('m', msg, `Loop end: ${diffTime(begin)}  `)
})
on('loop', (...args) => {
  let msg = args.join('')
  log('b','   Loop-', msg)
})
on('asyncBlock', (...args) => {
  let msg = args.join('')
  log('r', msg, 'Async: ', diffTime(begin));
});
on('asyncNonBlock', (...args) => {
  let msg = args.join('')
  log('c', msg, 'Async: ', diffTime(begin));
});

const loopConfig = {
  'N': 1000,
  'divisor': 100,
  'Emitter': Emitter,
}

eachBlocking(loopConfig)
eachNonBlocking(loopConfig)
forBlocking(loopConfig)
forNonBlocking(loopConfig)
eachOpt({
  'N': 100000,
  'divisor': 10000,
  'Emitter': Emitter,
  'intervalTime': 1,
  'intervalForAsync': 10
})
forOpt({
  'N': 100000,
  'divisor': 10000,
  'Emitter': Emitter,
  'intervalTime': 50,
  'intervalForAsync': 10
})


function on(event,func){
  Emitter.on(event,func)
}

function hrTime(){
  return Math.round(Number(process.hrtime.bigint()) / 1000)
}
function diffTime(begin){

  let diff = (hrTime() - begin).toString()
  const len = diff.length
  if (len < 4) {
    return diff + 'μs'
  }
  if (len > 3 && len < 6) { 
    return diff.substring(0,len-3) + 'ms' +
    diff.substring(len-1,len-4) + 'μs'
  }
  if (len > 5) {
    let sec = ''
    if (len !== 6) {
      sec = diff.substring(0,len-6) + 's '
    }
    return sec + 
           diff.substring(len-6,len-3) + 'ms ' +
           diff.substring(len-1,len-4) + 'μs'
  }
}