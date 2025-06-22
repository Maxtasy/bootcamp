class Drawer extends HTMLElement {
  constructor() {
    super();

    document.addEventListener("drawer:open", () => {
      this.open();
    });

    document.addEventListener("drawer:close", () => {
      this.close();
    });

    this.addEventListener("button:click:close", () => {
      this.close();

      document.dispatchEvent(new Event("backdrop:hide"));
    });
  }

  open() {
    this.classList.add("Drawer--Active");
  }

  close() {
    this.classList.remove("Drawer--Active");
  }
}

customElements.define("drawer-component", Drawer);
