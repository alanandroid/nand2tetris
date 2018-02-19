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

const { CommandLineError, FileReadError } = require('./js/errors');
const { translateFile } = require('./js/translateFile');
const { translateDirectory } = require('./js/translateDirectory');

// If the user didn't give us an input file/folder
if (process.argv.length < 3) {
  throw new CommandLineError();

} else {
  const inputPathFromUser = process.argv[2];
  const outputPathFromUser = process.argv[3];
      
  parseTranslationParameters(inputPathFromUser, outputPathFromUser);
}

function parseTranslationParameters(inputPath, outputPath) {
    // capture our input file/folder
    const input = './' + inputPath;

    // define an output file
    const output = defineOutputFile(inputPath, outputPath);
    // create it, or in the case that it already exists, clear its contents
    fs.writeFileSync(output, '');

    // does the input file exist? if not, let's get out of here.
    if (!fs.existsSync(input)) {
      throw new FileReadError();

    // otherwise, if it's the name of a directory
    } else if (fs.lstatSync(input).isDirectory()) {
      translateDirectory(input, output);

    // otherwise, if it's the name of a file
    } else if (fs.lstatSync(input).isFile()) {
      translateFile(input, output);

    } else {
      throw new FileReadError();
    }

    console.log(`Translation complete! Find your fresh assembly in ${output}.`);
}

function defineOutputFile(inputPath, outputPath) {
  let output;
  // if an output file is supplied, use it
  if (outputPath) {
    output = './' + outputPath;
  // otherwise, we'll make one based upon the input file's name
  } else {
    // check if the input file has an extension, in order to remove it
    const indexOfFilenameEnd = inputPath.lastIndexOf('.');
    // if so, we'll remove the preexisting extension first, and then append '.asm'
    if (indexOfFilenameEnd > 0) {
      output = inputPath.substring(0,indexOfFilenameEnd) + '.asm';
    // if not, we'll use the full value of input, appending '.asm'
    } else {
      output = inputPath + '.asm';
    }
  }
  return output;
}
