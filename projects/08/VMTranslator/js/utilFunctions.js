/**
 * File Overview:
 *
 */

const path = require('path')

function getFileName() {

  if(!process.argv[2]) {
    throw new Error('Unable to extract filename argument. please execute again using translate.js');
  }
  return path.parse(process.argv[2]).name;
}

function getMemoryPointer(memorySegment) {

  switch (memorySegment.toUpperCase()) {
    case 'CONSTANT':
      return 'CONSTANT';
    case 'LOCAL':
      return '@LCL' + '\n'
        + 'A=M';
    case 'ARGUMENT':
      return '@ARG' + '\n'
        + 'A=M';
    case 'THIS':
      return '@THIS' + '\n'
        + 'A=M';
    case 'THAT':
      return '@THAT' + '\n'
        + 'A=M';
    case 'TEMP':
      return '@5';
    case 'STATIC':
      return 'STATIC';
    case 'POINTER':
      return 'POINTER';
    default:
      return '';
  }
}

function parseTHISorTHAT (memoryAddress) {
  if (memoryAddress === 0) {
    return 'THIS';
  } else if (memoryAddress === 1) {
    return 'THAT';
  } else {
    // TODO make this less bad
    throw new Error('A nondesript error occurred.');
  }
}

/* This function generates a unique symbol of the format 'name.i', where 'name'
 * is the the symbol's name, and 'i' is an integer, auto-inserted and auto-
 * incremented. These addresses are used for addressing jump condition.
 */
function getUniqueSymbol (symbolName = 'symbol') {
  if( typeof getUniqueSymbol.counter == 'undefined' ) {
    getUniqueSymbol.counter = 0;
  }
  return symbolName + '.' + getUniqueSymbol.counter++;
}

module.exports = {
  getFileName,
  getMemoryPointer,
  getUniqueSymbol,
  parseTHISorTHAT
};
