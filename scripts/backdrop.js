class Backdrop extends HTMLElement {
  constructor() {
    super();

    document.addEventListener("backdrop:show", () => {
      this.show();
    });

    document.addEventListener("backdrop:hide", () => {
      this.hide();
    });

    this.addEventListener("click", () => {
      this.hide();

      const event = new Event("drawer:close");
      document.dispatchEvent(event);
    });
  }

  show() {
    this.classList.add("Backdrop--Active");
  }

  hide() {
    this.classList.remove("Backdrop--Active");
  }
}

customElements.define("backdrop-component", Backdrop);
