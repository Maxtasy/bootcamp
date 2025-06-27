import { ButtonComponent, defineComponent } from "../component/component.js";

const componentTagName = "button-component";

class Button extends ButtonComponent {
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

defineComponent(componentTagName, Button, "button");
