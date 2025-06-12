const accordionBoxElements = document.querySelectorAll(".AccordionJS__Box");

accordionBoxElements.forEach((accordionBoxElement) => {
  const labelElement = accordionBoxElement.querySelector(".AccordionJS__Label");
  const contentElement = accordionBoxElement.querySelector(
    ".AccordionJS__Content",
  );

  labelElement.addEventListener("click", () => {
    const contentHeight = contentElement.scrollHeight;
    contentElement.style.setProperty("--content-height", contentHeight);

    contentElement.classList.toggle("AccordionJS__Content--Active");
  });
});
