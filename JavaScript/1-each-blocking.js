'use strict';

const N = 1000;
const numbers = new Array(N).fill(1);

setTimeout(() => {
  console.log('\x1b[36m%s\x1b[0m', 'setTimeout(0) is done ... ');
}, 0);

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

