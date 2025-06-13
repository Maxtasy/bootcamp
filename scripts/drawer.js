class Drawer extends HTMLElement {
  constructor() {
    super();

    document.addEventListener("drawer:open", () => {
      this.open();
    });

    document.addEventListener("drawer:close", () => {
      this.close();
    });

    this.closeButtonElement.addEventListener("click", () => {
      this.close();

      const event = new Event("backdrop:hide");
      document.dispatchEvent(event);
    });
  }

  open() {
    this.classList.add("Drawer--Active");
  }

  close() {
    this.classList.remove("Drawer--Active");
  }

  get closeButtonElement() {
    return this.querySelector(".CloseButton");
  }
}

customElements.define("drawer-component", Drawer);
