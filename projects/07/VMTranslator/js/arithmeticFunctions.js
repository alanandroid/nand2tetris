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
const { getUniqueSymbol } = require('./utilFunctions');

/* Translates the VM operation 'NEG', which pops the value at the top of the
 * stack, computes its negative, and pushes it back on top of the stack.
 */
function translateNEG() {
 return unaryOperatorTemplate('-');
}

/* Translates the VM operation 'NOT', which pops the value at the top of the
 * stack, computes its bitwise inverse, and pushes it back on top of the stack.
 */
function translateNOT() {
 return unaryOperatorTemplate('!');
}

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
  return binaryOperatorTemplate('+');
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
  return binaryOperatorTemplate('-');
}

function translateAND() {
  return binaryOperatorTemplate('&');
}

function translateOR() {
  return binaryOperatorTemplate('|');
  /*
   * SP--
   * D=*SP
   * SP--
   * D=D||*SP
   * *SP=D
   */
}

function translateEQ() {
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
   return booleanOperatorTemplate('eq');
}

function translateGT() {
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
   return booleanOperatorTemplate('gt');
}

function translateLT() {
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
   return booleanOperatorTemplate('lt');
}

/* This function provides a template for our unary operators (-x, !x). The process
 * flow is as follows:
 *
 * SP--                       decrement the stack pointer
 * *SP = <OPERATOR> *SP       operate on the top element
 * SP++                       increment the stack pointer
 */
function unaryOperatorTemplate(operator) {
  return `
@SP
AM=M-1
M=${operator}M
@SP
M=M+1
`;
}

/* This function provides a template for our binary, non-boolean operators (x+y,
 * x-y, x&y, x|y). The process flow is as follows:
 *
 * SP--                       decrement the stack pointer
 * D = *SP                    assign the value from the top of the stack to the
 *                              data register
 * SP--                       decrement the stack pointer
 * D = *SP <OPERATOR> D       compute the value from the top of the stack
 *                              operated on by the value in the data register
 * *SP = D                    push the calculated value on top of the stack
 * SP++                       increment the stack pointer
 */
function binaryOperatorTemplate(operator) {
  return `
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M${operator}D
M=D
@SP
M=M+1
`;
}

/* This function provides a template for our boolean operators ('LT', 'GT',
 * 'EQ'). The process flow is as follows:
 *
 * SP--                       decrement the stack pointer
 * D = *SP                    assign the value from the top of the stack to the
 *                              data register
 * SP--                       decrement the stack pointer
 * D = D - *SP                compute the value in the data register minus
 *                              the value from the top of the stack. the HACK
 *                              assembly jumps on the conditions compared to
 *                              zero, so we start by taking the difference of
 *                              the values.
 * *SP = 0                    push 0 (false) on top of the stack
 * @arith.{id}                point to the (uniquely generated) symbol below
 * <JUMP INSTRUCTION>         conditionally, jump to that symbol
 * *SP = 1                    push -1 (true) on top of the stack
 * (arith.{id})               the symbol we may have jumped to earlier
 * SP++                       increment the stack pointer
*/
function booleanOperatorTemplate(operator) {
  // generate a unique symbol to use as a jump address
  let jumpAddress = getUniqueSymbol();

  // generate the instruction for our conditional jump
  let jumpInstruction;

  /* straight forward translation from local operation to jump instruction.
   */
  switch (operator) {
    case 'lt':
      jumpInstruction = 'D;JLT'
      break;
    case 'gt':
      jumpInstruction = 'D;JGT'
      break;
    case 'eq':
      jumpInstruction = 'D;JEQ'
      break;
    default:
      throw new Error('That\'s not what that is for.');
  }

  return `
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@SP
A=M
M=-1
@${jumpAddress}
${jumpInstruction}
@SP
A=M
M=0
(${jumpAddress})
@SP
M=M+1
`;
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
