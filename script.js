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
const backdropElement = document.querySelector(".Backdrop");

drawerTriggerElements.forEach((drawerTriggerElement) => {
  drawerTriggerElement.addEventListener("click", () => {
    const drawerHandle = drawerTriggerElement.getAttribute(
      "data-drawer-trigger"
    );
    const drawerElement = document.querySelector(
      `[data-drawer="${drawerHandle}"]`
    );
    drawerElement.classList.add("Drawer--Active");
    backdropElement.classList.add("Backdrop--Active");
  });
});

closeButtonElements.forEach((closeButtonElement) => {
  closeButtonElement.addEventListener("click", () => {
    const drawerElement = closeButtonElement.closest(".Drawer");
    drawerElement.classList.remove("Drawer--Active");
    backdropElement.classList.remove("Backdrop--Active");
  });
});

linkElements.forEach((linkElement) => {
  linkElement.addEventListener("click", () => {
    const drawerElement = linkElement.closest(".Drawer");
    drawerElement.classList.remove("Drawer--Active");
    backdropElement.classList.remove("Backdrop--Active");
  });
});

backdropElement.addEventListener("click", () => {
  backdropElement.classList.remove("Backdrop--Active");
  const drawerElements = document.querySelectorAll(".Drawer");
  drawerElements.forEach((drawerElement) => {
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

// Logic for google search

const googleInputElement = document.querySelector("#google-input");
const googleSearchButtonElement = document.querySelector(
  "#google-search-button"
);

googleSearchButtonElement.addEventListener("click", () => {
  const googleInput = googleInputElement.value.trim();

  if (googleInput !== "") {
    const searchURL = `https://www.google.com/search?q=${encodeURIComponent(
      googleInput
    )}`;
    window.open(searchURL, "_blank");
  }
});

// Logic for calculator

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtonElements = document.querySelectorAll("[data-number]");
const operationButtonElements = document.querySelectorAll("[data-operation]");
const equalsButtonElement = document.querySelector("[data-equals]");
const deleteButtonElement = document.querySelector("[data-delete]");
const allClearButtonElement = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtonElements.forEach((numberButtonElement) => {
  numberButtonElement.addEventListener("click", () => {
    calculator.appendNumber(numberButtonElement.innerText);
    calculator.updateDisplay();
  });
});

operationButtonElements.forEach((operationButtonElement) => {
  operationButtonElement.addEventListener("click", () => {
    calculator.chooseOperation(operationButtonElement.innerText);
    calculator.updateDisplay();
  });
});

equalsButtonElement.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButtonElement.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButtonElement.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

// Functions

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function randomGreeting(name) {
  const greetings = ["Hello", "Hi", "Servus", "Good evening"];
  const index = Math.round(Math.random() * 3);

  return greetings[index] + ", " + name;
}

const result = randomGreeting("Elex");

// Logic for Shop the look section

const indicatorElements = document.querySelectorAll(".ShopTheLook .Indicator");
const xRangeElement = document.querySelector("[name='x-position']");
const yRangeElement = document.querySelector("[name='y-position']");
const controlsElement = document.querySelector(".Controls");
const shopTheLookElements = document.querySelectorAll(".ShopTheLook");
const paginationItemElements = document.querySelectorAll(".Pagination__Item");
const previousButtonElement = document.querySelector("[data-action='prev']");
const nextButtonElement = document.querySelector("[data-action='next']");
const saveIndicatorsButtonElement = document.querySelector("#save-indicators");

let activeIndicator = null;
let activeShopTheLookIndex = 0;

function setActiveStates() {
  shopTheLookElements.forEach((shopTheLookElement, index) => {
    const isActiveShopTheLookElement = index === activeShopTheLookIndex;
    shopTheLookElement.classList.toggle(
      "ShopTheLook--Active",
      isActiveShopTheLookElement
    );
  });

  paginationItemElements.forEach((paginationItemElement, index) => {
    const isActivePaginationItemElement = index === activeShopTheLookIndex;
    paginationItemElement.classList.toggle(
      "Pagination__Item--Active",
      isActivePaginationItemElement
    );
  });
}

indicatorElements.forEach((indicatorElement, index) => {
  indicatorElement.addEventListener("click", (event) => {
    const clickedIndicator = event.target;

    // Handle active state for each indicator element

    indicatorElements.forEach((element) => {
      const shouldBeActive =
        element === clickedIndicator &&
        !element.classList.contains("Indicator--Active");
      if (shouldBeActive) {
        activeIndicator = clickedIndicator;
      }
      element.classList.toggle("Indicator--Active", shouldBeActive);
    });

    // Set controls to clicked indicator element

    const xValue = clickedIndicator.style.getPropertyValue("--x-position");
    const yValue = clickedIndicator.style.getPropertyValue("--y-position");

    xRangeElement.value = xValue;
    yRangeElement.value = yValue;
  });

  const indicatorPositionsRaw = localStorage.getItem("indicator-positions");

  if (!indicatorPositionsRaw) return;

  const indicatorPositions = JSON.parse(indicatorPositionsRaw);

  const positionsForElement = indicatorPositions[index];

  indicatorElement.style.setProperty(
    "--x-position",
    positionsForElement.xPosition
  );
  indicatorElement.style.setProperty(
    "--y-position",
    positionsForElement.yPosition
  );
});

xRangeElement.addEventListener("input", (event) => {
  const xValue = event.target.value;

  activeIndicator.style.setProperty("--x-position", xValue);
});

yRangeElement.addEventListener("input", (event) => {
  const yValue = event.target.value;

  activeIndicator.style.setProperty("--y-position", yValue);
});

nextButtonElement.addEventListener("click", () => {
  if (activeShopTheLookIndex >= shopTheLookElements.length - 1) {
    activeShopTheLookIndex = 0;
  } else {
    activeShopTheLookIndex = activeShopTheLookIndex + 1;
  }

  setActiveStates();
});

previousButtonElement.addEventListener("click", () => {
  if (activeShopTheLookIndex <= 0) {
    activeShopTheLookIndex = shopTheLookElements.length - 1;
  } else {
    activeShopTheLookIndex = activeShopTheLookIndex - 1;
  }

  setActiveStates();
});

saveIndicatorsButtonElement.addEventListener("click", () => {
  const indicatorPositions = [];

  indicatorElements.forEach((indicatorElement) => {
    const xPosition = indicatorElement.style.getPropertyValue("--x-position");
    const yPosition = indicatorElement.style.getPropertyValue("--y-position");

    indicatorPositions.push({ xPosition, yPosition });
  });
  localStorage.setItem(
    "indicator-positions",
    JSON.stringify(indicatorPositions)
  );
});
