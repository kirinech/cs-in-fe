interface FilterIter {
  <T>(
    collection: Iterable<T>,
    filter: (value: T) => boolean,
  ): IterableIterator<T>,
}

export const filter: FilterIter = (collection, isSatisfy) => {
  const it = collection[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      let next = it.next();
      while (!isSatisfy(next.value) && !next.done) {
        next = it.next();
      }
      return next;
    },
  }
}

