interface SeqIter {
  (...args: (Iterable<any>)[]): IterableIterator<any>,
}

export const seq: SeqIter = (...iterables) => {
  let collectionPointer = 0;
  let currIter = iterables[collectionPointer][Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      let next = currIter.next();
      while (next.done) {
        if (collectionPointer === iterables.length - 1) {
          return {
            done: true,
            value: undefined,
          }
        }
        collectionPointer++;
        currIter = iterables[collectionPointer][Symbol.iterator]();
        next = currIter.next();
      }

      return next;
    },
  }
}

