class CompilationError extends Error {
  constructor(line, lineNumber) {
    super('Error at line number ' + lineNumber + '.\n'
      + 'Unable to parse "' + line + '"');
    this.name = "CompilationError";
  }
}

/**
* File Overview:
*
* This file is our primary access point for translating VM code into Assembly
* (both, in this case, refering to the HACK computer, as described in the
* course nand2tetris, from which this codebase is derived).
*
* See readme.md for further information.
*/
const fs  = require('fs');
const path = require('path');

let stack = [];

// If the user didn't give us an input file
if (process.argv.length < 3) {
  // \x1b[31m causes the text following it to be red, \x1b[0m resets to default
  console.log('\x1b[31m' + 'Error: You must provide 2 filenames to proceed.' + '\x1b[0m');
  console.log('Please enter commands using the syntax: ' +
      'node translate <input file>');
  console.log('or, you can include an output file name: ' +
      'node translate <input filename> <output filename>');
  process.exit(1);

} else {
  // capture out input file
  const input = './' + process.argv[2];
  let output;
  // if an output file is supplied, use it
  if (process.argv[3]) {
    output = './' + process.argv[3];
  // otherwise, we'll make one based upon the input file's name
  } else {
    // make sure the input file has an extension
    const indexOfFilenameEnd = input.lastIndexOf('.');
    // if not, we'll just slap '.asm' on there,
    if (indexOfFilenameEnd < 0) {
      output = input + '.asm';
    // otherwise, we'll remove the preexisting extension first
    } else {
      output = input.substring(0,indexOfFilenameEnd) + '.asm';
    }
  }

  // does the input file exist? if not, let's get out of here.
  if (!fs.existsSync(input)) {
    console.log('\x1b[31m' + 'Error: The input file provided does not exist.' + '\x1b[0m');
    process.exit(1);

  } else {
    // create, or clear content in the output file.
    fs.writeFileSync(output, '');

    fs.readFileSync(input).toString().split('\n').forEach(function (line, lineNumber) {
      fs.appendFileSync(output, translateLine(line, lineNumber + 1));
    });
  }
}

function translateLine(line, lineNumber) {
  line = line.toString();
  line = removeExtraWhiteSpaceFrom(line);
  // if the string is empty, return an empty line
  if(!line) return '';

  const words = line.toString().split(' ');

  let translatedLine;

  switch(words[0].toUpperCase()) {

    case 'POP':
      translatedLine = translatePOP(words);
      break;

    case 'PUSH':
      translatedLine = translatePUSH(words);
      break;

    case 'ADD':
      translatedLine = translateADD(words);
      break;

    case 'SUB':
      translatedLine = translateSUB(words);
      break;

    case 'NEG':
      translatedLine = translateNEG(words);
      break;

    case 'EQ':
      translatedLine = translateEQ(words);
      break;

    case 'GT':
      translatedLine = translateGT(words);
      break;

    case 'LT':
      translatedLine = translateLT(words);
      break;

    case 'AND':
      translatedLine = translateAND(words);
      break;

    case 'OR':
      translatedLine = translateOR(words);
      break;

    case 'NOT':
      translatedLine = translateNOT(words);
      break;
    default:
      throw new CompilationError(line, lineNumber);
  }

  const completeStatement =
      '// ' + line + '\n' +
      translatedLine + '\n';

  return completeStatement;
}

function translatePOP(words) {
  const memoryAddress = words[1];
  const memoryAddress = parseInt(words[2]);

  switch (memorySegment) {

    case 'CONSTANT':
      return 'CONST';

    case 'LOCAL':
      return '' +
      // addr = LCL+memoryAddress
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
      // SP--;
      '@SP' + '\n' +
      'M=M-1' + '\n' +
      //*addr = *SP
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

    case 'CONSTANT':
      // TODO fixxxxx
      return 'CONST';

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

  return 'POP';
}

function translatePUSH(words) {
  const memorySegment = words[1];
  const memoryAddress = parseInt(words[2]);

  switch (memorySegment) {

    case 'CONSTANT':
      return 'CONST';

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
      // add LCL to the memory address

      // was 'D=D+A' + '\n' +
      // point the address register at LCL+memoryAddress
      'A=D+A' + '\n' +
        // TODO delete indented?
          // create a new variable
          // '@addr'
          // store LCL+memoryAddress in it
          // 'M=D'
          // -----------
          // *SP = *addr
          // -----------
          // '@addr' + '\n' +
          // *SP - point at the memory address stored in @SP
          // 'A=M' + '\n' +
      // store whatever is there in the data register
      'D=M' + '\n' +
      // point at our variable created above, which contains LCL+memoryAddress
      '@SP' + '\n' +
      // point the address register at LCL+memoryAddress
      'A=M' + '\n' +
      // and put the contents of the data register (the contents of *SP) there
      'M=D' + '\n';
      // -----
      // SP++;
      // -----
      '@SP' + '\n' +
      'M=M+1' + '\n' +

    case 'ARGUMENT':
      return 'ARG';

    case 'THIS':
      return 'THIS';

    case 'THAT':
      return 'THAT';

    case 'CONSTANT':
      // TODO fixxxxx
      return 'CONST';

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

function translateADD(words) {
  return 'ADD';
}

function translateSUB(words) {
  return 'SUB';
}

function translateNEG(words) {
  return 'NEG';
}

function translateEQ(words) {
  return 'EQ';
}

function translateGT(words) {
  return 'GT';
}

function translateLT(words) {
  return 'LT';
}

function translateAND(words) {
  return 'AND';
}

function translateOR(words) {
  return 'OR';
}

function translateNOT(words) {
  return 'NOT';
}

function removeExtraWhiteSpaceFrom(string) {
  return string.replace(/\s+/g, ' ').trim();
}

/*
add, sub, neg, eq, gt, lt, and, or not
pop segment i, push segment i
segments:
  local
  argument
  this
  that
  constant
  static
  pointer
  temp
*/
