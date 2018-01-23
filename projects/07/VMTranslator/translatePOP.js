/**
 * File Overview:
 *
 */
const { CompilationError } = require('./errors');

function translatePOP(words) {
  const memorySegment = words[1];
  const memoryAddress = parseInt(words[2]);

  console.log('memory segment', memorySegment);
  console.log('memory address', memoryAddress);

  switch (memorySegment.toUpperCase()) {

    case 'LOCAL':
      return '' +
      // ------------------------
      // addr = LCL+memoryAddress
      // ------------------------
      // look at the memory address in order to get it's value into memory
      '@' + memoryAddress + '\n' +
      // store that value in the data register
      'D=A' + '\n' +
      // look at LCL in memory
      '@LCL' + '\n' +
      // add LCL to the memory address
      'D=D+A' + '\n' +
      // create a new variable
      '@addr'
      // store LCL+memoryAddress in it
      'M=D'
      // -----
      // SP--;
      // -----
      '@SP' + '\n' +
      'M=M-1' + '\n' +
      // ----------
      //*addr = *SP
      // ----------
      // @SP should be here, but we're already looking at it
      // *SP - point at the memory address stored in @SP
      'A=M' + '\n' +
      // store whatever is there in the data register
      'D=M' + '\n' +
      // point at our variable created above, which contains LCL+memoryAddress
      '@addr' + '\n' +
      // point the address register at LCL+memoryAddress
      'A=M' + '\n' +
      // and put the contents of the data register (the contents of *SP) there
      'M=D' + '\n';

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
      return 'SP--' + '\n' + thisOrThat + ' = *SP';

    case 'TEMP':
      return 'TEMP';

    default:
      return '';
  }
}

module.exports = {
  translatePOP
}
