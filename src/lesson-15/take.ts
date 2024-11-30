// const arr = [1,2,3,4,5];
// const iter = arr.values();
// console.log(arr[Symbol.iterator]);
// console.log(iter[Symbol.iterator]);
// console.log(iter[Symbol.iterator]());

// for (let item of arr) {
//   console.log(item);
// }

interface TakeIter {
  <T>(collection: Iterable<T>, amount: number): IterableIterator<T>,
}

export const take: TakeIter = (collection, amount) => {
  let pointer = 0;
  const it = collection[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      if (pointer >= amount) {
        return {
          done: true,
          value: undefined,
        }
      }
      pointer++;
      return it.next();
    },
  }
}

