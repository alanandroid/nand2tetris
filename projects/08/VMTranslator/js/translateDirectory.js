/**
* File Overview:
*
* This function translates the contents of an entire directoy of HACK vm code
* files into HACK assembly.
*
* Note: only files with the extension vm (ie. myFile.vm) will be translated.
*
* See readme.md for further information.
*/
const fs  = require('fs');

const { FileReadError } = require('./errors');
const { translateFile } = require('./translateFile');

function translateDirectory(input, output) {

  // if the input isn't a directoy, get out of here
  if (!fs.existsSync(input) || !fs.lstatSync(input).isDirectory()) {
    throw new FileReadError();
  }

  // get a list of all files/directories present, and for each...
  fs.readdirSync(input).forEach(fileName => {
    // construct a 'path-to' string, appending './' if it's not already there
    const pathToFile = input.startsWith('./') ? `${input}/${fileName}` : `./${input}/${fileName}`;

    // if it's a .vm file, translate it,
    if(fileName.toLowerCase().endsWith('.vm')) {
      translateFile(pathToFile, output);
    // if it's a directory, recurse,
    } else if(fs.lstatSync(pathToFile).isDirectory()) {
      translateDirectory(pathToFile, output);
    }
    // otherwise, do nothing at all.
    return;
  });

}

module.exports = {
  translateDirectory
}
