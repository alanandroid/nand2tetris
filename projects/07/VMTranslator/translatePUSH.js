/**
 * File Overview:
 *
 */
const { CompilationError } = require('./errors');

function translatePUSH(words) {
  const memorySegment = words[1];
  const memoryAddress = parseInt(words[2]);

  switch (memorySegment) {

    case 'CONSTANT':
    //TODO finish
      return `@${memoryAddress}
      D=A
      @SP
      ...`
      return '' +
      // ------------------------
      // *SP = memoryAddress
      // ------------------------
      // look at the memory address in order to get it's value into memory
      '@' + memoryAddress + '\n' +
      // store that value in the data register
      'D=A' + '\n' +
      // point at *SP
      '@SP' + '\n' +
      'A=M' + '\n' +
      // and put the contents of the data register (memoryAddress, or our constant) there
      'M=D' + '\n' +
      // -----
      // SP++;
      // -----
      '@SP' + '\n' +
      'M=M+1' + '\n';

    case 'LOCAL':
      return '' +
      // ------------------------
      // *SP = *addr
      // ------------------------
      // look at the memory address in order to get it's value into memory
      '@' + memoryAddress + '\n' +
      // store that value in the data register
      'D=A' + '\n' +
      // look at LCL in memory
      '@LCL' + '\n' +
      // point the address register at LCL+memoryAddress
      'A=D+A' + '\n' +
      // store whatever is there in the data register
      'D=M' + '\n' +
      // point at *SP
      '@SP' + '\n' +
      'A=M' + '\n' +
      // and put the contents of the data register (the contents of *addr) there
      'M=D' + '\n' +
      // -----
      // SP++;
      // -----
      '@SP' + '\n' +
      'M=M+1' + '\n';

    case 'ARGUMENT':
      return 'ARG';

    case 'THIS':
      return 'THIS';

    case 'THAT':
      return 'THAT';

    case 'STATIC':
      return 'STATIC';

    case 'POINTER':
      let thisOrThat;
      if (memoryAddress === 0) {
        thisOrThat = 'THIS';
      } else if (memoryAddress === 1) {
        thisOrThat = 'THAT';
      } else {
        // TODO make this less bad
        throw new Error('A nondesript error occurred.');
      }
      return '*SP = ' + thisOrThat + '\n' + 'SP++';

    case 'TEMP':
      return 'TEMP';

    default:
      return '';
  }

  return 'PUSH';
}

module.exports = {
  translatePUSH
}
