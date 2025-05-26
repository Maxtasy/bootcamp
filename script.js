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

// Logic for Flexbox Items

const itemElements = document.querySelectorAll(".Container .Item");

itemElements.forEach((itemElement) => {
  itemElement.addEventListener("click", () => {
    itemElement.classList.toggle("Item--Inverted");
  });
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

// Logic for drawers

const drawerTriggerElements = document.querySelectorAll(
  "[data-drawer-trigger]"
);
const closeButtonElements = document.querySelectorAll(".Drawer .CloseButton");
const linkElements = document.querySelectorAll(".Drawer .Link");

drawerTriggerElements.forEach((drawerTriggerElement) => {
  drawerTriggerElement.addEventListener("click", () => {
    const drawerHandle = drawerTriggerElement.getAttribute(
      "data-drawer-trigger"
    );
    const drawerElement = document.querySelector(
      `[data-drawer="${drawerHandle}"]`
    );
    drawerElement.classList.add("Drawer--Active");
  });
});

closeButtonElements.forEach((closeButtonElement) => {
  closeButtonElement.addEventListener("click", () => {
    const drawerElement = closeButtonElement.closest(".Drawer");
    drawerElement.classList.remove("Drawer--Active");
  });
});

linkElements.forEach((linkElement) => {
  linkElement.addEventListener("click", () => {
    const drawerElement = linkElement.closest(".Drawer");
    drawerElement.classList.remove("Drawer--Active");
  });
});

// Logic for cat API

const catButtonElement = document.querySelector("#get-cat-image");
const imageCountElement = document.querySelector("#image-count");
const removeCatButtonElement = document.querySelector("#remove-cat-image");

catButtonElement.addEventListener("click", () => {
  const imageCount = imageCountElement.value;
  fetch(`https://api.thecatapi.com/v1/images/search?limit=${imageCount}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const catItems = data;
      catItems.forEach((catItem, index) => {
        if (index > imageCount - 1) return;
        const imageElement = document.createElement("img");
        imageElement.src = catItem.url;
        imageElement.classList.add("CatImage");
        const catSectionElement = catButtonElement.closest(".Section");
        catSectionElement.appendChild(imageElement);
      });
    });
});

removeCatButtonElement.addEventListener("click", () => {
  const allCatImageElements = document.querySelectorAll(".CatImage");
  const imageCount = parseInt(imageCountElement.value);

  allCatImageElements.forEach((allCatImageElement, index) => {
    if (index >= imageCount) return;
    allCatImageElement.remove();
  });
});
