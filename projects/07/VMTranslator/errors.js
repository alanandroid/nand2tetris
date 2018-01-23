class CompilationError extends Error {
  constructor(line, lineNumber) {
    const errorMessage = '\x1b[31m' + 'COMPILATION ERROR' + '\x1b[0m' + '\n' +
        'Error at line number ' + lineNumber + '.\n'
        'Unable to parse "' + line + '"';

    console.log(errorMessage);
    process.exit(1);

    this.name = 'CompilationError';
  }
}

class CommandLineError extends Error {
  constructor() {
    // \x1b[31m causes the text following it to be red, \x1b[0m resets to default
    const errorMessage = '\x1b[31m' + 'COMMAND LINE ERROR' + '\x1b[0m' + '\n' +
        'You must provide 2 filenames to proceed.' + '\n' +
        'Please enter commands using the syntax: node translate <input file>' + '\n' +
        'or, you can include an output file name: node translate <input filename> <output filename>';

    console.log(errorMessage);
    process.exit(1);

    this.name = 'CommandLineError'
  }
}


class FileReadError extends Error {
  constructor() {
    // \x1b[31m causes the text following it to be red, \x1b[0m resets to default
    const errorMessage = '\x1b[31m' + 'COMMAND LINE ERROR' + '\x1b[0m' + '\n' +
        'The input file provided does not exist.';

    console.log(errorMessage);
    process.exit(1);

    this.name = 'FileReadError'
  }
}

module.exports = {
  CompilationError,
  CommandLineError,
  FileReadError
}
