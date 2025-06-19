// Logic for FlexBox Items

const itemElements = document.querySelectorAll(".FlexBox .FlexBox__Item");

itemElements.forEach((itemElement) => {
  itemElement.addEventListener("click", () => {
    itemElement.classList.toggle("FlexBox__Item--Inverted");
  });
});
