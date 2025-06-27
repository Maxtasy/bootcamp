import { Component, defineComponent } from "../component/component.js";
class Popup extends Component {
  constructor() {
    super();

    this.handle = this.getAttribute("data-handle");

    document.addEventListener("popup:show", (event) => {
      if (this.handle === event.detail.handle) {
        console.log("showing myself!");
        this.show();
      }
    });

    document.addEventListener("popup:hide", () => {
      this.hide();

      const event = new Event("backdrop:hide");
      document.dispatchEvent(event);
    });

    this.subscribe("button:click:close", () => {
      this.hide();

      const event = new Event("backdrop:hide");
      document.dispatchEvent(event);
    });
  }
  show() {
    this.classList.add("Popup--Active");
  }

  hide() {
    this.classList.remove("Popup--Active");
  }
}

defineComponent("popup-component", Popup);
