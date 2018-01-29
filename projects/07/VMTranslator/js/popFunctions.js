/**
 * File Overview:
 *
 * This file contains functions whose purpose is to generate symbolic assembly
 * for the POP opertaions in the HACK VM code. Descriptions found within
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
const { getFileName, getMemoryPointer, parseTHISorTHAT } = require('./utilFunctions');

function generateGeneralPOP(memorySegment, memoryAddress) {
  memorySegment = getMemoryPointer(memorySegment);

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
${memorySegment}
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
