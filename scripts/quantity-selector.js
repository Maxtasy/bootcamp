import { Component, defineComponent } from "./component.js";

const componentTagName = "quantity-selector-component";

class QuantitySelector extends Component {
  constructor() {
    super();

    this.currentValue = null;
    this.minValue = null;
    this.maxValue = null;
    this.stepValue = null;

    this.handleIncreaseButtonClick = this.handleIncreaseButtonClick.bind(this);
    this.handleDecreaseButtonClick = this.handleDecreaseButtonClick.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
  }

  connectedCallback() {
    this.currentValue = parseInt(this.inputElement.value) || 0;
    this.minValue = parseInt(this.inputElement.min) || 0;
    this.maxValue = parseInt(this.inputElement.max) || Infinity;
    this.stepValue = parseInt(this.inputElement.step) || 1;
    this.inputElement.value = this.currentValue;

    if (this.currentValue <= this.minValue) {
      this.decreaseButtonElement.disable();
    }

    if (this.currentValue >= this.maxValue) {
      this.increaseButtonElement.disable();
    }

    this.increaseButtonElement.addEventListener(
      "click",
      this.handleIncreaseButtonClick,
    );
    this.decreaseButtonElement.addEventListener(
      "click",
      this.handleDecreaseButtonClick,
    );

    this.formElement.addEventListener("input", this.handleFormInput);
  }

  handleIncreaseButtonClick() {
    this.currentValue = Math.max(
      this.minValue,
      Math.min(this.maxValue, this.currentValue + this.stepValue),
    );

    this.inputElement.value = this.currentValue;

    this.decreaseButtonElement.enable();

    if (this.currentValue >= this.maxValue) {
      this.increaseButtonElement.disable();
    } else {
      this.increaseButtonElement.enable();
    }
  }

  handleDecreaseButtonClick() {
    this.currentValue = Math.max(
      this.minValue,
      Math.min(this.maxValue, this.currentValue - this.stepValue),
    );

    this.inputElement.value = this.currentValue;

    this.increaseButtonElement.enable();

    if (this.currentValue <= this.minValue) {
      this.decreaseButtonElement.disable();
    } else {
      this.decreaseButtonElement.enable();
    }
  }

  handleFormInput() {
    this.currentValue = parseInt(this.inputElement.value) || 0;

    // Clamp value to min and max
    this.currentValue = Math.max(
      this.minValue,
      Math.min(this.maxValue, this.currentValue),
    );
    this.inputElement.value = this.currentValue;

    if (this.currentValue <= this.minValue) {
      this.decreaseButtonElement.disable();
    } else {
      this.decreaseButtonElement.enable();
    }

    if (this.currentValue >= this.maxValue) {
      this.increaseButtonElement.disable();
    } else {
      this.increaseButtonElement.enable();
    }
  }

  get increaseButtonElement() {
    return this.querySelector("[data-action='increase']");
  }

  get decreaseButtonElement() {
    return this.querySelector("[data-action='decrease']");
  }

  get formElement() {
    return this.querySelector("form");
  }

  get inputElement() {
    return this.querySelector("input[type='number']");
  }
}

defineComponent(componentTagName, QuantitySelector);
