interface EnumerateIter {
  <T>(
    collection: Iterable<T>
  ): IterableIterator<[number, T]>,
}

export const enumerate: EnumerateIter = <T>(collection: Iterable<T>) => {
  let position = 0;
  const it = collection[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      let { done, value } = it.next();
      const nextValue = [position, value] as [number, T];
      position++;
      return {
        done,
        value: nextValue,
      };
    },
  }
}

