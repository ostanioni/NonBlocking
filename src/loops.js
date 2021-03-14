'use strict';

/*|========================================|
  |          1-EACH_BLOCKING               |
  |========================================|*/
function eachBlocking(loopConfig){
  const {N, divisor, Emitter, time} = loopConfig
  if ((N === null) || (Emitter === undefined)) {
    console.error('[1-each-blocking]Error: arguments wrong ...')
    return 1
  }
  Emitter.emit('syncStart')
    for (let i=0; i<N; i++) {
      if (i%divisor === 0){
        Emitter.emit('sync')
        // console.log('sync')
      }    
    }
  Emitter.emit('syncEnd')
  
  setTimeout(()=>Emitter.emit('async'),0)  
}
export {eachBlocking}
// module.exports = {eachBlocking}
/*|========================================|
  |          1-EACH_BLOCKING               |
  |========================================|*/

