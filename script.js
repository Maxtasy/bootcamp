// Logic for copy buttons

const copyButtonElement = document.querySelector("#copy-button");
const removeButtonElement = document.querySelector("#remove-button");

copyButtonElement.addEventListener("click", () => {
  const normanCardElement = document.querySelector(".Section:has(.Norman)");
  const normanCardCloneElement = normanCardElement.cloneNode(true);
  normanCardElement.after(normanCardCloneElement);
});

removeButtonElement.addEventListener("click", () => {
  const allNormanCardElements = document.querySelectorAll(
    ".Section:has(.Norman)"
  );

  if (allNormanCardElements.length > 1) {
    allNormanCardElements[allNormanCardElements.length - 1].remove();
  }
});

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

// Logic for menu drawer

const burgerElement = document.querySelector(".BurgerMenu");
const drawerElement = document.querySelector(".Drawer");
const closeButtonElement = drawerElement.querySelector(".CloseButton");
const cartElement = document.querySelector(".Cart");
const cartDrawerElement = document.querySelector(".CartDrawer");
const closeButton2Element = cartDrawerElement.querySelector(".CloseButton2");

burgerElement.addEventListener("click", () => {
  drawerElement.classList.add("Drawer--Active");
});

closeButtonElement.addEventListener("click", () => {
  drawerElement.classList.remove("Drawer--Active");
});

cartElement.addEventListener("click", () => {
  cartDrawerElement.classList.add("CartDrawer--Active");
});

closeButton2Element.addEventListener("click", () => {
  cartDrawerElement.classList.remove("CartDrawer--Active");
});
