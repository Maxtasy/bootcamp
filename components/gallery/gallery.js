const galleryMainItemElements = document.querySelectorAll(".Gallery__Item");
const paginationItemElements = document.querySelectorAll(
  ".Gallery__PaginationItem",
);
const navigationButtonElements = document.querySelectorAll(
  ".Gallery__Navigation [data-action]",
);

let activeItemIndex = 0;

function updateActiveGalleryItem(index) {
  galleryMainItemElements.forEach(
    (galleryMainItemElement, galleryMainItemIndex) => {
      if (galleryMainItemIndex === index) {
        galleryMainItemElement.classList.add("Gallery__Item--Active");
      } else {
        galleryMainItemElement.classList.remove("Gallery__Item--Active");
      }
    },
  );
  paginationItemElements.forEach(
    (paginationItemElement, paginationItemElementIndex) => {
      if (paginationItemElementIndex === index) {
        paginationItemElement.classList.add("Gallery__PaginationItem--Active");
      } else {
        paginationItemElement.classList.remove(
          "Gallery__PaginationItem--Active",
        );
      }
    },
  );
}

paginationItemElements.forEach((paginationItemElement, index) => {
  paginationItemElement.addEventListener("click", () => {
    activeItemIndex = index;
    updateActiveGalleryItem(activeItemIndex);
  });
});

navigationButtonElements.forEach((navigationButtonElement) => {
  navigationButtonElement.addEventListener("click", () => {
    const action = navigationButtonElement.getAttribute("data-action");

    if (action === "prev") {
      activeItemIndex--;
      if (activeItemIndex < 0) {
        activeItemIndex = paginationItemElements.length - 1;
      }
    } else {
      activeItemIndex++;
      if (activeItemIndex > paginationItemElements.length - 1) {
        activeItemIndex = 0;
      }
    }
    updateActiveGalleryItem(activeItemIndex);
  });
});
