/**
 * File Overview:
 *
 */

function generateConstantPUSH(memoryAddress) {
  /*
   * look at the memory address in order to get it's value into memory, and
   * store that value in the data register. point at *SP,  and put the contents
   * of the data register (memoryAddress, or our constant) there.
  */
  return `
@${memoryAddress}
D=A
@SP
A=M
M=D
@SP
M=M+1
`;
}

function generateGeneralPOP(memorySegment, memoryAddress) {

  /* Explanation of the below:
  *
  * ------------------------
  * addr = memorySegment+memoryAddress
  * ------------------------
  * look at the memory address in order to get it's value into memory
  *    `@memoryAddress`
  * store that value in the data register
  *    `D=A`
  * look at memorySegment in memory
  *    `@memorySegment`
  * add memorySegment to the memory address
  *    `D=D+A`
  * create a new variable
  *    `@addr`
  * store memorySegment+memoryAddress in it
  *    `M=D`
  *
  * -----
  * SP--;
  * -----
  *    `@SP`
  *    `M=M-1`
  *
  * ----------
  * *addr = *SP
  * ----------
  * *SP - point at the memory address stored in @SP
  *    `A=M`
  * store whatever is there in the data register
  *    `D=M`
  * point at our variable created above, which contains memorySegment+memoryAddress
  *    `@addr`
  * point the address register at memorySegment+memoryAddress
  *    `A=M`
  * and put the contents of the data register (the contents of *SP) there
  *    `M=D`;
  */
  console.log('hi');
  return `
@${memoryAddress}
D=A
@${memorySegment}
D=D+A
@addr
M=D
@SP
M=M-1
A=M
D=M
@addr
A=M
M=D
`;
}

function generateGeneralPUSH(memorySegment, memoryAddress) {

  /* Explanation of the below:
  *
  * ------------------------
  * *SP = *addr
  * ------------------------
  * look at the memory address in order to get it's value into memory
  *    `@memoryAddress`
  * store that value in the data register
  *    `D=A`
  * look at memorySegment in memory
  *    `@memorySegment`
  * point the address register at memorySegment+memoryAddress
  *    `A=D+A`
  * store whatever is there in the data register
  *    `D=M`
  * point at *SP
  *    `@SP`
  *    `A=M`
  * and put the contents of the data register (the contents of *addr) there
  *    `M=D`
  *
  * -----
  * SP++;
  * -----
  *    `@SP`
  *    `M=M+1`
  */

  return `
@${memoryAddress}
D=A
@${memorySegment}
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
`;
}

function parseMemorySegment (memorySegment) {

 switch (memorySegment.toUpperCase()) {
   case 'CONSTANT':
     return 'CONSTANT';
   case 'LOCAL':
     return 'LCL';
   case 'ARGUMENT':
     return 'ARG';
   case 'THIS':
     return 'THIS';
   case 'THAT':
     return 'THAT';
   case 'TEMP':
     return '5';
   case 'STATIC':
     return 'STATIC';
   case 'POINTER':
     return 'POINTER';
   default:
     return '';
 }
}

module.exports = {
  generateConstantPUSH,
  generateGeneralPOP,
  generateGeneralPUSH,
  parseMemorySegment,
};
