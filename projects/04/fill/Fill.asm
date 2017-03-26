// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed.
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// our main program loop
(LOOP)
  // check to see if the keyboard register is equal to zero.
  @KBD
  D=M
  @WHITE
  // if it is, no input is recieved, and the screen will be white.
  D;JEQ
  // otherwise, it will be black.
  @BLACK
  0;JMP

(WHITE)
  // store our screen-fill variable as 0, which will set the pixels to white
  @whiteOrBlack
  M=0
  // and jump to our screen-filling loop
  @SCREENFILL
  0;JMP

(BLACK)
  // store our screen-fill variable to -1, which will set the pixels to black
  @whiteOrBlack
  M=-1
  // and jump to the screen-filling loop
  @SCREENFILL
  0;JMP

(SCREENFILL)
  // first, we create a variable to store the current location on the screen
  @SCREEN
  D=A
  @currentScreenLocation
  M=D

  // then we'll loop around the screen and fill it in
  (SCREENLOOP)
    // grab our fill variable from above
    @whiteOrBlack
    D=M

    // point at the current screen location
    @currentScreenLocation
    A=M
    // set it equal to 0 (white) or -1 (black) based on our flow ab
    M=D

    // increase the current screen postion counter
    A=A+1
    // store it for use right now
    D=A
    // and for later
    @currentScreenLocation
    M=D

    // compare it to the value of KBD
    @KBD
    D=A-D
    // if A-D<=0, we're at the end of the screen registers, so we'll go back to LOOP
    @LOOP
    D;JLE
    // else, we'll return to our screen loop
    @SCREENLOOP
    0;JMP

    // TODO change logic to stop filling screen if input changes.
