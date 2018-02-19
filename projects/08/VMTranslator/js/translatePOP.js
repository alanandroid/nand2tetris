/**
* File Overview:
*
*/
const { CompilationError } = require('./errors');
const { generateGeneralPOP, generateStaticPOP, generatePointerPOP } = require('./popFunctions');

function translatePOP(words, fileName) {
  const memorySegment = words[1];
  const memoryAddress = parseInt(words[2]);

  switch (memorySegment.toUpperCase()) {

    case 'LOCAL':
    case 'ARGUMENT':
    case 'THIS':
    case 'THAT':
    case 'TEMP':
      return generateGeneralPOP(memorySegment, memoryAddress);

    case 'STATIC':
      return generateStaticPOP(memoryAddress, fileName);

    case 'POINTER':
      return generatePointerPOP(memoryAddress);

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
