import { Component } from "./component";

const plusItemElement = document.querySelector(".QuantitySelectorItem--Plus");
const valueItemElement = document.querySelector(".QuantitySelectorItem--Value");
const minusItemElement = document.querySelector(".QuantitySelectorItem--Minus");

let a = 1;

plusItemElement.addEventListener("click", () => {
  a++;
  a = a < 10 ? "0" + a : a;
  console.log(a);
  valueItemElement.innerText = a;
});

minusItemElement.addEventListener("click", () => {
  if (a > 1) {
    a--;
    a = a < 10 ? "0" + a : a;
    valueItemElement.innerText = a;
  }
});

class QuantitySelector extends Component {
  constructor() {
    super();
  }

  connectedCallback() {
    this.on("button:click:increase", () => {
      console.log("Increase event triggered");
    });

    this.on("button:click:decrease", () => {
      console.log("Decrease event triggered");
    });
  }
}

customElements.define("quantity-selector", QuantitySelector);
