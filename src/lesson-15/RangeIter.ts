interface RangeI<T extends string | number> extends Iterable<T>{
  readonly start: T;
  readonly end: T;

  reverse(): IterableIterator<T>;
}

export class RangeIter<T extends string | number> implements RangeI<T> {
  start: T;
  end: T;

  constructor(start: T, end: T) {
    this.start = start;
    this.end = end;
    return this;
  }

  reverse() {
    let current = this.end;
    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => {
        if (current < this.start) {
          return {
            done: true as true, // ????
            value: undefined,
          };
        }

        const result = current;
        current = typeof current === 'string' ?
          String.fromCharCode(current.charCodeAt(0) - 1) as T :
          (current as number) - 1 as T;

        return {
          done: false,
          value: result,
        }
      }
    }
  }

  [Symbol.iterator]() {
    let current = this.start;
    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => {
        if (current > this.end) {
          return {
            done: true as true, // ????
            value: undefined,
          };
        }
        const result = current;
        current = typeof current === 'string' ?
          String.fromCharCode(current.charCodeAt(0) + 1) as T :
          (current as number) + 1 as T;

        return {
          done: false,
          value: result,
        }
      }
    }
  }
}
