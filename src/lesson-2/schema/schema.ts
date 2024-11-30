type Schema = Array<[number, 'number' | 'boolean' | 'ascii']>;

const schema: Schema = [
  [3, 'number'],  // 3 бита число
  [2, 'number'],  // 3 бита число
  [1, 'boolean'], // 1 бит логический
  [1, 'boolean'], // 1 бит логический
  [16, 'ascii'],  // 16 бит 2 аски символа
];


const encode = function(values: unknown[], schema: Schema) {
  // bit mask (2 ^ 32 - 1) >>> (32 - length) << (shift)
  
}