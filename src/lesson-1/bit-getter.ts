export class BitGetter {

  #arr!: Uint8Array;

  constructor (arr: Uint8Array) {
    this.#arr = arr;
  }

  #checkAccessBoundaries(index: number, offset: number) {
    if (index < 0 || index > this.#arr.length - 1) throw new Error('Index is out of bounds');
    if (offset < 0 || offset > 7) throw new Error('Offset not in range [0, 7]');
  }

  at(index: number) {
    return this.#arr[index];
  }

  getBit(index: number, offset: number) {
    this.#checkAccessBoundaries(index, offset);
    const element = this.#arr[index];

    return (element & (1 << offset)) > 0 ? 1 : 0;
  }

  setBit(index: number, offset: number, bit: 0 | 1) {
    this.#checkAccessBoundaries(index, offset);
    const element = this.#arr[index];
    this.#arr[index] = bit ? element | (1 << offset) : element & ~(1 << offset);
  }
}