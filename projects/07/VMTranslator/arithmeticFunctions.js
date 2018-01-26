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
M=M-1
A=M
D=M
@SP
M=M-1
A=M
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
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
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
M=M-1
A=M
M=-M
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
M=M-1
A=M
D=M

@SP
M=M-1
A=M
D=D-M

@SP
A=M
M=0
@${jumpAddress}
D;JNE
@SP
A=M
M=-1
(${jumpAddress})
@SP
M=M+1
`;
}

function translateGT() {
  /*
   * SP--
   * D=*SP
   *
   */
  return `
@SP
M=M-1
A=M
D=M

`;
}

function translateLT() {
  /*
   * SP--
   * D=*SP
   *
   */
  return `
@SP
M=M-1
A=M
D=M

`;
}

function translateAND() {
  /*
   * SP--
   * D=*SP
   *
   */
  return `
@SP
M=M-1
A=M
D=M

`;
}

function translateOR() {
  /*
   * SP--
   * D=*SP
   *
   */
  return `
@SP
M=M-1
A=M
D=M

`;
}

function translateNOT() {
  /*
   * SP--
   * D=*SP
   *
   */
  return `
@SP
M=M-1
A=M
D=M

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
  translateNEG,
  translateEQ,
  translateGT,
  translateLT,
  translateAND,
  translateOR,
  translateNOT
};
