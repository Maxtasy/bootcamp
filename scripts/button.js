class Button extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("click", () => {
      const action = this.getAttribute("data-action");

      this.dispatchEvent(
        new CustomEvent(`button:click:${action}`, {
          bubbles: true,
          isTrusted: true,
        }),
      );
    });
  }
}

customElements.define("button-component", Button);
