//
let numberOfTotalEvents = 0
// actual number of synchronous events 
let actualNumberOfSyncEvents = 0
// expected number of synchronous events
let expectedNumberOfSyncEvents  = 0
// box for all events
let items = []
const asyncEvents = []
let syncEventsOver = false


class Stack extends Array {
  super(){
    const begin = process.hrtime.bigint()
    const diff = 0
  }
  
  isDone(){
    return syncEventsOver
  }
  isEmpty(){
    return ( n==0 )
  }
  push(str){
    switch (str) {
       'sync': ++actualNumberOfSyncEvents; break;
      'async': asyncEvents.push(actualNumberOfSyncEvents.toString());break;
      default: console.log('');break;
    }
    items[n++] = str
    if (actualNumberOfSyncEvents === expectedNumberOfSyncEvents) {
      const diff = (process.hrtime.bigint() - begin) / 1000000n
      syncEventsOver = true
    }
  }
  pop(){
    return items[--n]
  }
  clear(){
    numberOfTotalEvents = 0
    actualNumberOfSyncEvents = 0
    expectedNumberOfSyncEvents  = 0
    items = []
    asyncEvents = []
    syncEventsOver = false
  }
  size(){
    return n
  }
}