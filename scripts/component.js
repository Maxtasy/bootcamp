export class Component extends HTMLElement {
  constructor() {
    super();

    this.parsedData = parseDataAttributes(this);
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
    // For components that have an action attribute (e.g. Button), we want to append it to the event
    // name.

    let eventNameWithAction = eventName;

    if (this.parsedData.action) {
      eventNameWithAction += `:${this.parsedData.action}`;
    }

    const eventObject = new CustomEvent(eventNameWithAction, {
      bubbles: true,
      composed: true,
      detail: data,
    });

    this.dispatchEvent(eventObject);
  }
}

function parseDataValue(value) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function parseDataAttributes(element) {
  const data = {};
  for (const [key, value] of Object.entries(element.dataset)) {
    data[key] = parseDataValue(value);
  }
  return data;
}

export function defineComponent(tagName, componentClass) {
  if (customElements.get(tagName)) {
    console.warn(`Component with tag name ${tagName} is already defined.`);
    return;
  }

  customElements.define(tagName, componentClass);
}
