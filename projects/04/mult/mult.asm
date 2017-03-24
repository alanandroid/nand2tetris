// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

  @R2
  M=0

  @R1
  D=M
  @END
  D;JEQ

  @R0
  D=M
  @END
  D;JEQ

  // make a counter, set it equal to 0
  @counter
  M=0

// loop addition to produce multiplication
(LOOP)
  // check loop condition (counter <= R1)
  @counter
  D=M
  @R1
  D=M-D
  @END
  D;JLE
  // add R0 to R2, where we're storing our product.
  @R0
  D=M
  @R2
  M=D+M
  // increment counter
  @counter
  M=M+1
  // restart the loop
  @LOOP
  0;JMP
(END)
  @END
  0;JMP
