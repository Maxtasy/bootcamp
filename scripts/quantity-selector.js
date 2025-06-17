const increaseButtonElement = document.querySelector(
  ".QuantitySelector .Button:last-of-type",
);
const decreaseButtonElement = document.querySelector(
  ".QuantitySelector .Button:first-of-type",
);
const inputElement = document.querySelector(".QuantitySelector .Input");

const formElement = document.querySelector(".QuantitySelector__Form");

let inputValue = inputElement.value;

increaseButtonElement.addEventListener("click", () => {
  decreaseButtonElement.removeAttribute("disabled");
  inputValue++;
  inputElement.value = inputValue;
});

decreaseButtonElement.addEventListener("click", () => {
  inputValue--;
  inputElement.value = inputValue;
  if (inputValue <= 1) {
    decreaseButtonElement.setAttribute("disabled", "disabled");
  }
});

formElement.addEventListener("input", (event) => {
  event.preventDefault();
  if (inputElement.value <= 1) {
    decreaseButtonElement.setAttribute("disabled", "disabled");
  } else {
    decreaseButtonElement.removeAttribute("disabled");
  }
});
