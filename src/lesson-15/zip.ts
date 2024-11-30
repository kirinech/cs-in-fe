interface ZipIter {
  (...args: (Iterable<any>)[]): IterableIterator<any>,
}

export const zip: ZipIter = (...iterables) => {
  let iters = iterables.map(i => i[Symbol.iterator]());
  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      const values = iters.map(iter => iter.next());
      if (values.every(val => val.done)) {
        return {
          done: true,
          value: undefined,
        }
      }

      return {
        done: false,
        value: values.map(next => next.value),
      };
    },
  }
}

