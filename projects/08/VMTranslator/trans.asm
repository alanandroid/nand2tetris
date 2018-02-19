// push constant 10
@10
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop local 0
@0
D=A
@LCL
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

// push constant 21
@21
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 22
@22
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop argument 2
@2
D=A
@ARG
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

// pop argument 1
@1
D=A
@ARG
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

// push constant 36
@36
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop this 6
@6
D=A
@THIS
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

// push constant 42
@42
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 45
@45
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop that 5
@5
D=A
@THAT
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

// pop that 2
@2
D=A
@THAT
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

// push constant 510
@510
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop temp 6
@6
D=A
@5
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

// push local 0
@0
D=A
@LCL
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// push that 5
@5
D=A
@THAT
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M+D
M=D
@SP
M=M+1

// push argument 1
@1
D=A
@ARG
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// sub
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M-D
M=D
@SP
M=M+1

// push this 6
@6
D=A
@THIS
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 6
@6
D=A
@THIS
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M+D
M=D
@SP
M=M+1

// sub
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M-D
M=D
@SP
M=M+1

// push temp 6
@6
D=A
@5
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M+D
M=D
@SP
M=M+1

// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1

// eq
@SP
AM=M-1
D=M
@SP
AM=M-1
D=D-M
@SP
A=M
M=-1
@arithmetic.0
D;JEQ
@SP
A=M
M=0
(arithmetic.0)
@SP
M=M+1

// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 16
@16
D=A
@SP
A=M
M=D
@SP
M=M+1

// eq
@SP
AM=M-1
D=M
@SP
AM=M-1
D=D-M
@SP
A=M
M=-1
@arithmetic.1
D;JEQ
@SP
A=M
M=0
(arithmetic.1)
@SP
M=M+1

// push constant 16
@16
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1

// eq
@SP
AM=M-1
D=M
@SP
AM=M-1
D=D-M
@SP
A=M
M=-1
@arithmetic.2
D;JEQ
@SP
A=M
M=0
(arithmetic.2)
@SP
M=M+1

// push constant 892
@892
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1

// lt
@SP
AM=M-1
D=M
@SP
AM=M-1
D=D-M
@SP
A=M
M=-1
@arithmetic.3
D;JGT
@SP
A=M
M=0
(arithmetic.3)
@SP
M=M+1

// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 892
@892
D=A
@SP
A=M
M=D
@SP
M=M+1

// lt
@SP
AM=M-1
D=M
@SP
AM=M-1
D=D-M
@SP
A=M
M=-1
@arithmetic.4
D;JGT
@SP
A=M
M=0
(arithmetic.4)
@SP
M=M+1

// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1

// lt
@SP
AM=M-1
D=M
@SP
AM=M-1
D=D-M
@SP
A=M
M=-1
@arithmetic.5
D;JGT
@SP
A=M
M=0
(arithmetic.5)
@SP
M=M+1

// push constant 32767
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

// gt
@SP
AM=M-1
D=M
@SP
AM=M-1
D=D-M
@SP
A=M
M=-1
@arithmetic.6
D;JLT
@SP
A=M
M=0
(arithmetic.6)
@SP
M=M+1

// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 32767
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1

// gt
@SP
AM=M-1
D=M
@SP
AM=M-1
D=D-M
@SP
A=M
M=-1
@arithmetic.7
D;JLT
@SP
A=M
M=0
(arithmetic.7)
@SP
M=M+1

// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

// gt
@SP
AM=M-1
D=M
@SP
AM=M-1
D=D-M
@SP
A=M
M=-1
@arithmetic.8
D;JLT
@SP
A=M
M=0
(arithmetic.8)
@SP
M=M+1

// push constant 57
@57
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 31
@31
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 53
@53
D=A
@SP
A=M
M=D
@SP
M=M+1

// add
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M+D
M=D
@SP
M=M+1

// push constant 112
@112
D=A
@SP
A=M
M=D
@SP
M=M+1

// sub
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M-D
M=D
@SP
M=M+1

// neg
@SP
AM=M-1
M=-M
@SP
M=M+1

// pop static 1
@SP
M=M-1
A=M
D=M
@StackTest.1
M=D

// push static 1
@StackTest.1
D=M
@SP
A=M
M=D
@SP
M=M+1

// and
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M&D
M=D
@SP
M=M+1

// push constant 82
@82
D=A
@SP
A=M
M=D
@SP
M=M+1

// or
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M|D
M=D
@SP
M=M+1

// not
@SP
AM=M-1
M=!M
@SP
M=M+1

// push constant 111
@111
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 333
@333
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 888
@888
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop static 8
@SP
M=M-1
A=M
D=M
@StaticTest.8
M=D

// pop static 3
@SP
M=M-1
A=M
D=M
@StaticTest.3
M=D

// pop static 1
@SP
M=M-1
A=M
D=M
@StaticTest.1
M=D

// push static 3
@StaticTest.3
D=M
@SP
A=M
M=D
@SP
M=M+1

// push static 1
@StaticTest.1
D=M
@SP
A=M
M=D
@SP
M=M+1

// sub
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M-D
M=D
@SP
M=M+1

// push static 8
@StaticTest.8
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M+D
M=D
@SP
M=M+1

