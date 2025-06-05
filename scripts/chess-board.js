// Logic for chessboard

const boardElement = document.getElementById("chessboard");
const startPosition = [
  ["♜", "♞", "♝", "♚", "♛", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
];

for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    const squareElement = document.createElement("div");
    squareElement.classList.add("Square");

    if ((row + col) % 2 === 0) {
      squareElement.classList.add("Square--White");
    } else {
      squareElement.classList.add("Square--Black");
    }

    const piece = startPosition[row][col];
    if (piece) {
      squareElement.innerText = piece;
      if ("♜♞♝♚♛♟".includes(piece)) {
        squareElement.style.color = "black";
      } else {
        squareElement.style.color = "white";
      }
    }

    boardElement.appendChild(squareElement);
  }
}
