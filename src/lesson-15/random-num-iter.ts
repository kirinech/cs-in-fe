// const arr = [1,2,3,4,5];
// const iter = arr.values();
// console.log(arr[Symbol.iterator]);
// console.log(iter[Symbol.iterator]);
// console.log(iter[Symbol.iterator]());

// for (let item of arr) {
//   console.log(item);
// }

interface RandomNumIter {
  (min: number, max: number): IterableIterator<number>,
}

export const random: RandomNumIter = (min, max) => {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      const result = () => Math.floor(Math.random() * (max - min) + min);
      return {
        done: false,
        value: result(),
      }
    }
  }
}

