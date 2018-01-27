/**
 * File Overview:
 *
 */
const { getFileName, parseMemorySegment, parseTHISorTHAT } = require('./utilFunctions');

function generateGeneralPOP(memorySegment, memoryAddress) {
  memorySegment = parseMemorySegment(memorySegment);

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
  return `
@${memoryAddress}
D=A
@${memorySegment}
A=M
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

function generatePointerPOP(memoryAddress) {
  let THISorTHAT = parseTHISorTHAT(memoryAddress);

  /*
  * SP--
  * THIS/THAT = *SP
  */

  return `
@SP
M=M-1
A=M
D=M
@${THISorTHAT}
M=D
`;
}

function generateStaticPOP(memoryAddress) {
  /*
  * SP--
  * D=*SP
  * @memoryAddress.5
  * M=D
  */
  const fileName = getFileName();

  return `
@SP
M=M-1
A=M
D=M
@${fileName}.${memoryAddress}
M=D
`;

}

module.exports = {
  generateGeneralPOP,
  generatePointerPOP,
  generateStaticPOP,
};
