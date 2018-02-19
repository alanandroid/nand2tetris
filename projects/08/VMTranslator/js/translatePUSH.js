/**
* File Overview:
*
*/
const { CompilationError } = require('./errors');
const { generateGeneralPUSH, generateConstantPUSH, generatePointerPUSH, generateStaticPUSH } = require('./pushFunctions');

function translatePUSH(words, fileName) {
  const memorySegment = words[1];
  const memoryAddress = parseInt(words[2]);

  switch (memorySegment.toUpperCase()) {

    case 'LOCAL':
    case 'ARGUMENT':
    case 'THIS':
    case 'THAT':
    case 'TEMP':
      return generateGeneralPUSH(memorySegment, memoryAddress);

    case 'CONSTANT':
      return generateConstantPUSH(memoryAddress);

    case 'STATIC':
      return generateStaticPUSH(memoryAddress, fileName);

    case 'POINTER':
      return generatePointerPUSH(memoryAddress);

    default:
      return '';
  }
}

module.exports = {
  translatePUSH
};

/**

Static handling:

store each static in foo.i, where foo is the name of file
i.e. push static 10 in translate.js -> add translate.10 onto the stack

push static 5
->
*SP = *translate.5
SP++


Temp handling:

insert TEMP = 5, same as LOCAL
no TMP symbol


Pointer handling:

push pointer 0
->
accesses THIS

push pointer 1
->
accesses THAT

*SP = THIS/THAT
SP++

*/
