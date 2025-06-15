// Create popup component
class Popup extends HTMLElement {
  constructor() {
    super();

    this.handle = this.getAttribute("data-handle");

    // Listen for events popup:show and popup:hide

    document.addEventListener("popup:show", (event) => {
      if (this.handle === event.detail) {
        this.show();
      }
    });

    document.addEventListener("popup:hide", () => {
      this.hide();

      const event = new Event("backdrop:hide");
      document.dispatchEvent(event);
    });

    this.closeButtonElement.addEventListener("click", () => {
      this.hide();

      const event = new Event("backdrop:hide");
      document.dispatchEvent(event);
    });
  }

  // Add methods show and hide
  show() {
    this.classList.add("PopUp--Active");
  }

  hide() {
    this.classList.remove("PopUp--Active");
  }

  get closeButtonElement() {
    return this.querySelector(".CloseButton");
  }
}

customElements.define("popup-component", Popup);
