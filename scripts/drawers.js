// Logic for drawers

const drawerTriggerElements = document.querySelectorAll(
  "[data-drawer-trigger]",
);
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
