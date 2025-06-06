// Logic for Shop the look section

const indicatorElements = document.querySelectorAll(".ShopTheLook .Indicator");
const xRangeElement = document.querySelector("[name='x-position']");
const yRangeElement = document.querySelector("[name='y-position']");
const controlsElement = document.querySelector(".Controls");
const shopTheLookElements = document.querySelectorAll(".ShopTheLook");
const paginationItemElements = document.querySelectorAll(".Pagination__Item");
const previousButtonElement = document.querySelector("[data-action='prev']");
const nextButtonElement = document.querySelector("[data-action='next']");
const saveIndicatorsButtonElement = document.querySelector("#save-indicators");
const popUpElements = document.querySelectorAll(".PopUp");

let activeIndicator = null;
let activeShopTheLookIndex = 0;

function setActiveStates() {
  shopTheLookElements.forEach((shopTheLookElement, index) => {
    const isActiveShopTheLookElement = index === activeShopTheLookIndex;
    shopTheLookElement.classList.toggle(
      "ShopTheLook--Active",
      isActiveShopTheLookElement
    );
  });

  paginationItemElements.forEach((paginationItemElement, index) => {
    const isActivePaginationItemElement = index === activeShopTheLookIndex;
    paginationItemElement.classList.toggle(
      "Pagination__Item--Active",
      isActivePaginationItemElement
    );
  });
}

indicatorElements.forEach((indicatorElement, index) => {
  indicatorElement.addEventListener("click", (event) => {
    const clickedIndicator = event.target;

    // Handle active state for each indicator element

    indicatorElements.forEach((element) => {
      const shouldBeActive =
        element === clickedIndicator &&
        !element.classList.contains("Indicator--Active");
      if (shouldBeActive) {
        activeIndicator = clickedIndicator;
      }
      element.classList.toggle("Indicator--Active", shouldBeActive);
    });

    // Set controls to clicked indicator element

    const xValue = clickedIndicator.style.getPropertyValue("--x-position");
    const yValue = clickedIndicator.style.getPropertyValue("--y-position");

    xRangeElement.value = xValue;
    yRangeElement.value = yValue;

    // Show connected pop up

    popUpElements[index].classList.add("PopUp--Active");
  });

  const indicatorPositionsRaw = localStorage.getItem("indicator-positions");

  if (!indicatorPositionsRaw) return;

  const indicatorPositions = JSON.parse(indicatorPositionsRaw);

  const positionsForElement = indicatorPositions[index];

  indicatorElement.style.setProperty(
    "--x-position",
    positionsForElement.xPosition
  );
  indicatorElement.style.setProperty(
    "--y-position",
    positionsForElement.yPosition
  );
});

xRangeElement.addEventListener("input", (event) => {
  const xValue = event.target.value;

  activeIndicator.style.setProperty("--x-position", xValue);
});

yRangeElement.addEventListener("input", (event) => {
  const yValue = event.target.value;

  activeIndicator.style.setProperty("--y-position", yValue);
});

nextButtonElement.addEventListener("click", () => {
  if (activeShopTheLookIndex >= shopTheLookElements.length - 1) {
    activeShopTheLookIndex = 0;
  } else {
    activeShopTheLookIndex = activeShopTheLookIndex + 1;
  }

  setActiveStates();
});

previousButtonElement.addEventListener("click", () => {
  if (activeShopTheLookIndex <= 0) {
    activeShopTheLookIndex = shopTheLookElements.length - 1;
  } else {
    activeShopTheLookIndex = activeShopTheLookIndex - 1;
  }

  setActiveStates();
});

saveIndicatorsButtonElement.addEventListener("click", () => {
  const indicatorPositions = [];

  indicatorElements.forEach((indicatorElement) => {
    const xPosition = indicatorElement.style.getPropertyValue("--x-position");
    const yPosition = indicatorElement.style.getPropertyValue("--y-position");

    indicatorPositions.push({ xPosition, yPosition });
  });
  localStorage.setItem(
    "indicator-positions",
    JSON.stringify(indicatorPositions)
  );
});
