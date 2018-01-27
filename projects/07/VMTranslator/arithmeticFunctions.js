/**
 * File Overview:
 *
 * This file contains functions whose purpose is to generate symbolic assembly
 * for the arithmetic opertaions in the HACK VM code. Descriptions found within
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

/**
 * This function translates the VM instruction ADD into the appropriate HACK
 * assembly instructions:
 *
 * SP--
 * D=*SP
 * SP--
 * D=D+*SP
 * *SP=D
 */
function translateADD() {
  return `
@SP
AM=M-1
D=M
@SP
AM=M-1
D=D+M
M=D
@SP
M=M+1
`;
}

/**
 * This function translates the VM instruction SUB into the appropriate HACK
 * assembly instructions:
 *
 * SP--
 * D=*SP
 * SP--
 * D=*SP-D
 * *SP=D
 */
function translateSUB() {
  return `
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M-D
M=D
@SP
M=M+1
`;
}

function translateAND() {
  /*
   * SP--
   * D=*SP
   * SP--
   * D=D&*SP
   * *SP=D
   */
  return `
@SP
AM=M-1
D=M
@SP
AM=M-1
D=D&M
M=D
@SP
M=M+1
`;
}

function translateOR() {
  /*
   * SP--
   * D=*SP
   * SP--
   * D=D||*SP
   * *SP=D
   */
  return `
@SP
AM=M-1
D=M
@SP
AM=M-1
D=D||M
M=D
@SP
M=M+1
`;
}

function translateNEG() {
  return `
@SP
AM=M-1
M=-M
@SP
M=M+1
`;
}

function translateNOT() {
  /*
   * SP--
   * *SP=!*SP
   * SP++
   */
  return `
@SP
AM=M-1
M=!M
@SP
M=M+1
`;
}

function translateEQ() {
  let jumpAddress = getUniqueAddressSymbol();
  /*
   * SP--
   * D=*SP
   * SP--
   * D=D-*SP
   * *SP=0
   * @arith.{id}
   * D;JNE
   * *SP=1
   * (arith.{id})
   *
   */
  return `
@SP
AM=M-1
D=M

@SP
AM=M-1
D=D-M

@SP
A=M
M=-1
@${jumpAddress}
D;JEQ
@SP
A=M
M=-0
(${jumpAddress})
@SP
M=M+1
`;
}

function translateGT() {
  let jumpAddress = getUniqueAddressSymbol();
  /*
   * SP--
   * D=*SP
   * SP--
   * D=D-*SP
   * *SP=0
   * @arith.{id}
   * D;JGT
   * *SP=1
   * (arith.{id})
   *
   */
  return `
@SP
AM=M-1
D=M

@SP
AM=M-1
D=D-M

@SP
A=M
M=-1
@${jumpAddress}
D;JGT
@SP
A=M
M=0
(${jumpAddress})
@SP
M=M+1
`;
}

function translateLT() {
  let jumpAddress = getUniqueAddressSymbol();
  /*
   * SP--
   * D=*SP
   * SP--
   * D=D-*SP
   * *SP=0
   * @arith.{id}
   * D;JLT
   * *SP=1
   * (arith.{id})
   *
   */
  return `
@SP
AM=M-1
D=M

@SP
AM=M-1
D=D-M

@SP
A=M
M=-1
@${jumpAddress}
D;JLT
@SP
A=M
M=0
(${jumpAddress})
@SP
M=M+1
`;
}

function getUniqueAddressSymbol () {
  if( typeof getUniqueAddressSymbol.counter == 'undefined' ) {
    getUniqueAddressSymbol.counter = 0;
  }
  return 'arithmetic.' + getUniqueAddressSymbol.counter++;
}

module.exports = {
  translateADD,
  translateSUB,
  translateAND,
  translateOR,
  translateNEG,
  translateNOT,
  translateEQ,
  translateGT,
  translateLT
};
