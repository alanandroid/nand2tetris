// push constant 1
@1
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 3
@3
D=A
@SP
A=M
M=D
@SP
M=M+1

// add
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

// push constant 4
@4
D=A
@SP
A=M
M=D
@SP
M=M+1

// eq
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
@arithmetic.0
D;JNE
@SP
A=M
M=-1
(arithmetic.0)
@SP
M=M+1
