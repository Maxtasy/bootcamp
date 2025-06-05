// Logic for cat API

const catButtonElement = document.querySelector("#get-cat-image");
const imageCountElement = document.querySelector("#image-count");
const removeCatButtonElement = document.querySelector("#remove-cat-image");

catButtonElement.addEventListener("click", () => {
  const imageCount = imageCountElement.value;
  fetch(`https://api.thecatapi.com/v1/images/search?limit=${imageCount}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const catItems = data;
      catItems.forEach((catItem, index) => {
        if (index > imageCount - 1) return;
        const imageElement = document.createElement("img");
        imageElement.src = catItem.url;
        imageElement.classList.add("CatImage");
        const catSectionElement = catButtonElement.closest(".Section");
        catSectionElement.appendChild(imageElement);
      });
    });
});

removeCatButtonElement.addEventListener("click", () => {
  const allCatImageElements = document.querySelectorAll(".CatImage");
  const imageCount = parseInt(imageCountElement.value);

  allCatImageElements.forEach((allCatImageElement, index) => {
    if (index >= imageCount) return;
    allCatImageElement.remove();
  });
});
