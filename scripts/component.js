export class Component extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {}

  disconnectedCallback() {}

  on(eventName, callbackFunction) {
    this.addEventListener(eventName, (event) => {
      e.preventDefault();

      if (event instanceof CustomEvent) {
        callbackFunction(event.detail);
      } else {
        console.warn(`Event ${eventName} is not a CustomEvent.`);
      }
    });
  }

  publish(eventName, data) {
    const eventObject = new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail: data,
    });

    this.dispatchEvent(eventObject);
  }
}
