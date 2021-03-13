'use strict';

const N = 1000;
const numbers = new Array(N).fill(1);
/*|========================================|
  |          1-EACH_BLOCKING               |
  |========================================|*/
export default function(arr=null){
  if (arr === null){
    return '[1-each-blocking]Error: argument is null ...'
  }
  if (arr1.length != arr2.length){
    arr.forEach(_=>_*3)
    setTimeout(_=>_)
  }
}
/* ========================================== */
/*|========================================|
  |          1-EACH_BLOCKING               |
  |========================================|*/



setTimeout(() => {
  console.log('\x1b[36m%s\x1b[0m', 'setTimeout(0) is done ... ');
}, 0);
*/

console.time(`${N}-elements`);

/* _________ 1 ________________*/
numbers.forEach((item, i) => {
  console.log(i);
});
/* ____________________________*/

console.timeEnd(`${N}-elements`);

console.time(`minTime`);
setTimeout(() => false, 0);
console.timeEnd(`minTime`);

