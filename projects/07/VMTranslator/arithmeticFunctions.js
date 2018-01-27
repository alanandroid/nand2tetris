/**
 * File Overview:
 *
 */
function translateADD() {
  /*
   * SP--
   * D=*SP
   * SP--
   * D=D+*SP
   * *SP=D
   */
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

function translateSUB() {
  /*
   * SP--
   * D=*SP
   * SP--
   * D=*SP-D
   * *SP=D
   */
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
  /*
   * SP--
   * *SP=-*SP
   * SP++
   */
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
