import { enumerate } from './enumerate';
import { random } from './random-num-iter'
import { filter } from './filter';
import { take } from './take';
import { RangeIter } from './RangeIter';
import { seq } from './seq';
import { zip } from './zip';

const randomNumIter = enumerate(filter(take(random(10, 100), 10), (value) => value % 2 === 0));
console.log('----');
for (let item of randomNumIter) {
  console.log(item);
}

const randomInt = random(0, 100);
console.log('----');
console.log([...take(enumerate(randomInt), 3)]); // [[0, ...], [1, ...], [2, ...]]

const range = new RangeIter('a', 'f');

console.log(...range.reverse());
const numberRange = new RangeIter(-5, 1);

console.log(Array.from(numberRange.reverse()));

console.log(...seq([1, 2], new Set([3, 4]), 'bl')); // [[1, 3, b], [2, 4, 'l']]

console.log(...zip([1, 2], new Set([3, 4]), 'bl')); // [[1, 3, b], [2, 4, 'l']]
