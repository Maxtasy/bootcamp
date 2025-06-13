// Logic for drawers

const drawerTriggerElements = document.querySelectorAll(
  "[data-drawer-trigger]",
);
const closeButtonElements = document.querySelectorAll(".Drawer .CloseButton");
const linkElements = document.querySelectorAll(".Drawer .Link");
const backdropElement = document.querySelector(".Backdrop");

drawerTriggerElements.forEach((drawerTriggerElement) => {
  drawerTriggerElement.addEventListener("click", () => {
    const event = new Event("backdrop:show");
    document.dispatchEvent(event);

    const drawerHandle = drawerTriggerElement.getAttribute(
      "data-drawer-trigger",
    );
    const drawerElement = document.querySelector(
      `[data-drawer="${drawerHandle}"]`,
    );
    drawerElement.classList.add("Drawer--Active");
  });
});

linkElements.forEach((linkElement) => {
  linkElement.addEventListener("click", () => {
    const drawerElement = linkElement.closest(".Drawer");
    drawerElement.classList.remove("Drawer--Active");

    const event = new Event("backdrop:hide");
    document.dispatchEvent(event);
  });
});

// backdropElement.addEventListener("click", () => {
//   const event = new Event("backdrop:hide");
//   document.dispatchEvent(event);

//   // Close all drawer Elements

//   const drawerElements = document.querySelectorAll(".Drawer");

//   drawerElements.forEach((drawerElement) => {
//     drawerElement.classList.remove("Drawer--Active");
//   });

//   // Close all pop up elements (Shop-the-look)

//   const popUpElements = document.querySelectorAll(".PopUp");

//   popUpElements.forEach((popUpElement) => {
//     popUpElement.classList.remove("PopUp--Active");
//   });
// });
