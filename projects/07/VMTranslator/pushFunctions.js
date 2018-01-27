/**
 * File Overview:
 *
 */
const { getFileName, parseMemorySegment, parseTHISorTHAT } = require('./utilFunctions');

function generateGeneralPUSH(memorySegment, memoryAddress) {
  memorySegment = parseMemorySegment(memorySegment);

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
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
`;
}

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

function generatePointerPUSH(memoryAddress) {
  let THISorTHAT = parseTHISorTHAT(memoryAddress);

  /*
  * *SP = THIS/THAT
  * SP++
  */

  return `
@${THISorTHAT}
D=M
@SP
A=M
M=D
@SP
M=M+1
`;
}

function generateStaticPUSH(memoryAddress) {
  const fileName = getFileName();
  /*
   * *SP = *translate.5
   * SP++
   */
 return `
@${fileName}.${memoryAddress}
D=M
@SP
A=M
M=D
M=M+1
`;
}

module.exports = {
  generateGeneralPUSH,
  generateConstantPUSH,
  generatePointerPUSH,
  generateStaticPUSH,
};
