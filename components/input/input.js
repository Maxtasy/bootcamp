const inputActionElements = document.querySelectorAll(".Input__Action");

inputActionElements.forEach((inputActionElement) => {
  inputActionElement.addEventListener("click", () => {
    const connectedInputActionElements = inputActionElement
      .closest(".InputWrapper")
      .querySelectorAll(".Input__Action");
    connectedInputActionElements.forEach((element) => {
      if (element === inputActionElement) {
        element.classList.remove("Input__Action--Active");
      } else {
        element.classList.add("Input__Action--Active");
      }
    });
    const connectedInputElement = inputActionElement
      .closest(".InputWrapper")
      .querySelector(".Input");
    const currentType = connectedInputElement.type;

    if (currentType === "text") {
      connectedInputElement.type = "password";
    } else {
      connectedInputElement.type = "text";
    }
  });
});
