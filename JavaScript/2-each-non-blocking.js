'use strict';

// let startTime = window.performance.now();
// let elapsedTime = performance.now() - startTime;

const N = 100;
// const last = array.length - 1;
const last = N - 1;
const numbers = new Array(N).fill(1);

let startTime = performance.now();

const each = (array, fn) => {
  const next = i => {
    setTimeout(() => {
      fn(array[i], i);
      if (i !== last) next(++i);
    }, 0);
  };
  next(0);
};

let k = 0;
const timer = setInterval(() => {
  console.log('next ', k++);
}, 10);

const begin = process.hrtime.bigint();
console.time(`Benchmark`);
each(numbers, (item, i) => {
  console.log(i);
  if (i === last) {
    clearInterval(timer);
    
    console.timeEnd(`Benchmark`);
    const diff = (process.hrtime.bigint() - begin) / 1000000n;
    console.log( '\x1b[36m%s\x1b[0m', `Benchmark took ${diff} ms`);
  };
});

let elapsedTime = performance.now() - startTime;
console.log(`$Elapsed time: ${elapsedTime}`)
