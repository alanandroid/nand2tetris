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

function parseMemorySegment (memorySegment) {

  switch (memorySegment.toUpperCase()) {
    case 'CONSTANT':
      return 'CONSTANT';
    case 'LOCAL':
      return 'LCL';
    case 'ARGUMENT':
      return 'ARG';
    case 'THIS':
      return 'THIS';
    case 'THAT':
      return 'THAT';
    case 'TEMP':
      return '5';
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

module.exports = {
  getFileName,
  parseMemorySegment,
  parseTHISorTHAT
};
