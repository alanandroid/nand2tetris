/**
* File Overview:
*
*/
const { CompilationError } = require('./errors');
const { generateGeneralPOP, parseMemorySegment } = require('./utilFunctions');

function translatePOP(words) {
  const memorySegment = parseMemorySegment(words[1]);
  const memoryAddress = parseInt(words[2]);

  console.log('memory segment', memorySegment);
  console.log('memory address', memoryAddress);

  switch (memorySegment) {

    case 'LCL':
    case 'ARG':
    case 'THIS':
    case 'THAT':
    case 'TEMP':
      console.log(memorySegment);
      return generateGeneralPOP(memorySegment, memoryAddress);

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

    default:
      return '';
  }
}

module.exports = {
  translatePOP
}


/**

Static handling:

store each static in foo.i, where foo is the name of file
i.e. push static 10 in translate.js -> add translate.10 onto the stack

pop static 5
->
SP--
D=*SP
@translate.5
M=D


Temp handling:

TEMP = 5, same as LOCAL


Pointer handling:

pop pointer 0
->
accesses THIS

pop pointer 1
->
accesses THAT

SP--
THIS/THAT = *SP


*/
