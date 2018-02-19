/**
* File Overview:
*
* This function translates the contents of a single file of HACK vm code into
* HACK assembly.
*
* See readme.md for further information.
*/
const fs  = require('fs');
const path = require('path');

const { FileReadError } = require('./errors');
const { translateLine } = require('./translateLine');

function translateFile(input, output) {

  // if the input isn't a file, get out of here
  if (!fs.existsSync(input) || !fs.lstatSync(input).isFile()) {
    throw new FileReadError();
  }

  // if the output doesn't exist, make it
  if(!fs.existsSync(output)) {
    fs.writeFileSync(output, '');
  }

  // extract the filename from the input (for function and variable naming)
  const fileName = path.basename(input, '.vm');

  fs.readFileSync(input).toString().split('\n').forEach(function (line, lineNumber) {
    // ignore comments
    if(line.startsWith("//")) {
      return;
    } else {
      fs.appendFileSync(output, translateLine(line, lineNumber + 1, fileName));
    }
  });
}

module.exports = {
  translateFile
}
