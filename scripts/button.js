import { Component } from "./component.js";

const componentTagName = "button-component";

class Button extends Component {
  constructor() {
    super();

    this.enable = this.enable.bind(this);
    this.disable = this.disable.bind(this);
  }

  connectedCallback() {
    this.addEventListener("click", () => {
      this.publish("button:click");
    });
  }

  enable() {
    this.removeAttribute("disabled");
  }

  disable() {
    this.setAttribute("disabled", "disabled");
  }
}

customElements.define(componentTagName, Button);
