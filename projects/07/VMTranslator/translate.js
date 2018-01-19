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

    fs.readFileSync(input).toString().split('\n').forEach(function (line, index) {
      fs.appendFileSync(output, translateLine(line, index + 1));
    });
  }
}

function translateLine(line, lineNumber) {
  line = line.toString().toUpperCase();
  line = removeExtraWhiteSpaceFrom(line);
  // if the string is empty, return an empty line
  if(!line) return '';

  const words = line.toString().split(' ');

  let translatedLine;

  switch(words[0]) {
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
      throw Error ('ERROR: Compilation error at line ' + lineNumber + '\n'
        + 'unable to parse line \n'
        + '"' + line + '"';
      process.exit(-1);
  }

  const completeStatement = '// ' + line.toString() + '\n';

  return completeStatement;
}

function translatePOP(words) {
  return 'POP';
}

function translatePUSH(words) {
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
