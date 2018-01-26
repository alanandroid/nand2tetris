/**
 * File Overview:
 *
 * This file contains functions whose purpose is to generate symbolic assembly
 * for the PUSH opertaions in the HACK VM code. Descriptions found within
 * heavily leverage pseudo symbolic assembly code.
 *
 * You can find a thorough explanation of the symbolic assemly used here in
 * Chapter 4 of The Elements of Computing Systems by Noam Nisan and Shimon
 * Schocken, which is available for free on the internet at the course website,
 * found at http://www.nand2tetris.org/ as of this writing.
 *
 * Note: The pseudo-syntax *{address} is not dicussed until Chapter 7. It is
 * used to denote the data store in the memory address found in the register at
 * {address}. For example, if the value at the top of your stack is 5, *SP is
 * equal to the value found in RAM[5].
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
