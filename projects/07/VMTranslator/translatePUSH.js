/**
* File Overview:
*
*/
const { CompilationError } = require('./errors');
const { generateConstantPUSH, generateGeneralPUSH, parseMemorySegment } = require('./utilFunctions');

function translatePUSH(words) {
  const memorySegment = parseMemorySegment(words[1]);
  const memoryAddress = parseInt(words[2]);

  switch (memorySegment) {

    case 'LOCAL':
    case 'ARGUMENT':
    case 'THIS':
    case 'THAT':
    case 'TEMP':
      return generateGeneralPUSH(memorySegment, memoryAddress);

    case 'CONSTANT':
      return generateConstantPUSH(memoryAddress);

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
