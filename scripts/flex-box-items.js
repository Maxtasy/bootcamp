// Logic for Flexbox Items

const itemElements = document.querySelectorAll(".Container .Item");

itemElements.forEach((itemElement) => {
  itemElement.addEventListener("click", () => {
    itemElement.classList.toggle("Item--Inverted");
  });
});
