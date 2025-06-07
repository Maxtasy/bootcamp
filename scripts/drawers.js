// Logic for drawers

const drawerTriggerElements = document.querySelectorAll(
  "[data-drawer-trigger]"
);
const closeButtonElements = document.querySelectorAll(".Drawer .CloseButton");
const linkElements = document.querySelectorAll(".Drawer .Link");
const backdropElement = document.querySelector(".Backdrop");

drawerTriggerElements.forEach((drawerTriggerElement) => {
  drawerTriggerElement.addEventListener("click", () => {
    const drawerHandle = drawerTriggerElement.getAttribute(
      "data-drawer-trigger"
    );
    const drawerElement = document.querySelector(
      `[data-drawer="${drawerHandle}"]`
    );
    drawerElement.classList.add("Drawer--Active");
    backdropElement.classList.add("Backdrop--Active");
  });
});

closeButtonElements.forEach((closeButtonElement) => {
  closeButtonElement.addEventListener("click", () => {
    const drawerElement = closeButtonElement.closest(".Drawer");
    drawerElement.classList.remove("Drawer--Active");
    backdropElement.classList.remove("Backdrop--Active");
  });
});

linkElements.forEach((linkElement) => {
  linkElement.addEventListener("click", () => {
    const drawerElement = linkElement.closest(".Drawer");
    drawerElement.classList.remove("Drawer--Active");
    backdropElement.classList.remove("Backdrop--Active");
  });
});

backdropElement.addEventListener("click", () => {
  backdropElement.classList.remove("Backdrop--Active");

  // Close all drawer Elements

  const drawerElements = document.querySelectorAll(".Drawer");

  drawerElements.forEach((drawerElement) => {
    drawerElement.classList.remove("Drawer--Active");
  });

  // Close all pop up elements

  const popUpElements = document.querySelectorAll(".PopUp");

  popUpElements.forEach((popUpElement) => {
    popUpElement.classList.remove("PopUp--Active");
  });
});
