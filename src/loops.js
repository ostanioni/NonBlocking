'use strict';

import { setImmediate } from 'timers';
import log from './logger.js'

export {  eachBlocking, 
          eachNonBlocking,
          forBlocking,
          forNonBlocking,
          eachOpt
        }

/*|========================================|
  |          1-EACH-BLOCKING               |
  |========================================|*/
function eachBlocking(loopConfig){

  log('y', '1-EACH-BLOCKING ')
  const { N, divisor, Emitter } = loopConfig

  Emitter.emit('loopStart', '1.')
    for (let i=0; i<N; i++) {
      if (i%divisor === 0){
        Emitter.emit('loop', '1---', divisor.toString(), ' iterations')
      }    
    }
  Emitter.emit('loopEnd', '1. ')
  setImmediate(() => {
    Emitter.emit('asyncBlock', '1.')
   })
}

/*|========================================|
  |          2-EACH-NON-BLOCKING           |
  |========================================|*/
  function eachNonBlocking(loopConfig){
    log('y', '2-EACH-BLOCKING ')
    const { N, divisor, Emitter } = loopConfig

    each(0)
    Emitter.emit('loopStart', '2.')

    const IntervalId = setInterval(() => {
      Emitter.emit('asyncNonBlock', '2.') }, 100)
    
    function each(i){
      setTimeout(() => {
        if (i === N) {
          clearInterval(IntervalId)
          Emitter.emit('loopEnd', '2.')
        } else {
          if (i % divisor === 0) {
            Emitter.emit('loop', '2   ', divisor.toString(), ' iterations')
          }
          each(++i)
        }
      }, 0)
    }    
  }  
/*|========================================|
  |           3-FOR-BLOCKING               |
  |========================================|*/
  function forBlocking(loopConfig){

    log('y', '3-FOR-BLOCKING ')

    const { N, divisor, Emitter } = loopConfig

    setImmediate(() => {
      Emitter.emit('asyncBlock', '1.')
     })  
    
    const range = {
      start: 1,
      end: N,
      [Symbol.asyncIterator]() {
        let value = this.start;
        return {
          next: () => Promise.resolve({
            value,
            done: value++ === this.end
          })
        }
      }
    }
    
    asyncFor()

    async function asyncFor() {
      
      let i = range.start
      Emitter.emit('loopStart', '3.')

      for await (const number of range) {
        if (i++%divisor === 0){
          Emitter.emit('loop','3   ', divisor.toString(), ' iterations')
        }
        if (i === N){
          Emitter.emit('loopEnd', '3.')
        }
      }
    }
  }
  /*
  console.dir({
    range,
    names: Object.getOwnPropertyNames(range),
    symbols: Object.getOwnPropertySymbols(range),
  });
  */
/*|========================================|
  |           4-FOR-NON-BLOCKING           |
  |========================================|*/

function forNonBlocking(loopConfig){
  
  log('y', '4-FOR-NON-BLOCKING ')
  
  const { N, divisor, Emitter } = loopConfig

  const range = {
    start: 1,
    end: N,
    [Symbol.asyncIterator]() {
      let value = this.start
      return {
        next: () => new Promise(resolve => {
          setImmediate(() => {
            resolve({
              value,
              done: value++ === this.end
            })
          })
        })
      }
    }
  }
  
  asyncFor()

  const IntervalId = setInterval(() => {
    Emitter.emit('asyncNonBlock', '4.')
  }, 100)

  async function asyncFor() {
      
    let i = range.start
    Emitter.emit('loopStart', '4.')

    for await (const number of range) {
      if (i++%divisor === 0){
        Emitter.emit('loop', '4   ', divisor.toString(), ' iterations')
      }
      if (i === N){
        Emitter.emit('loopEnd', '4.')
        clearInterval(IntervalId)
      }
    }
  }
}
/*
console.dir({
  range,
  names: Object.getOwnPropertyNames(range),
  symbols: Object.getOwnPropertySymbols(range),
});
*/
/*|========================================|
  |              5-EACH-OPT                |
  |========================================|*/
function eachOpt(loopConfig, interval=10){
    
  log('y', '5-EACH-OPT')
    
  const { N, divisor, Emitter, intervalTime, intervalForAsync } = loopConfig

  const INTERVAL = interval

  Emitter.emit('loopStart', '4.')
  
  const IntervalId = setInterval(() => {
    Emitter.emit('asyncNonBlock', '5.')
  }, intervalTime)

  each()

  function each() {
    let i = 0      
    const next = () => {
      let begin = process.hrtime.bigint()
      while (i <= N) {
        let diff = (process.hrtime.bigint() - begin) / 1000000n
        if (diff > intervalForAsync) {
          setImmediate(next)
          break
        }
        if (i++%divisor === 0){
          Emitter.emit('loop', '5   ', divisor.toString(), ' iterations')
         }
        if (i === N){
          Emitter.emit('loopEnd', '5.')
          clearInterval(IntervalId)
          break
        }
      }
    }
    next()
  }
}
