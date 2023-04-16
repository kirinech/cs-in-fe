import { BitGetter } from "../base/bit-getter"

describe('BitGetter', () => {
  it('get(index, offset)', () => {
    const bitGetter = new BitGetter(new Uint8Array([0b0001, 0b0010, 0b0100]));
    expect(bitGetter.getBit(0, 0)).toBe(1);
    expect(bitGetter.getBit(0, 1)).toBe(0);
    expect(bitGetter.getBit(1, 1)).toBe(1);
    expect(bitGetter.getBit(2, 2)).toBe(1);
    expect(() => {
      bitGetter.getBit(3, 2);
    }).toThrow();
    expect(() => {
      bitGetter.getBit(2, 8);
    }).toThrow();
  });

  it('set(index, offset, bit)', () => {
    const bitGetter = new BitGetter(new Uint8Array([0b0001, 0b1111]));
    expect(bitGetter.at(0)).toBe(1);
    bitGetter.setBit(0, 0, 0);
    expect(bitGetter.at(0)).toBe(0);
    bitGetter.setBit(1, 2, 0);
    expect(bitGetter.at(1)).toBe(11);
  });
})