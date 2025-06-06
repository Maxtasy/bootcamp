// Logic for ToDo section

const toDoInputElement = document.querySelector("#to-do-input");
const saveButtonElement = document.querySelector("#to-do-save-button");
const toDoSectionElement = toDoInputElement.closest(".Section");
const toDoFormElement = document.querySelector(".ToDoForm");

const localStorageValueRaw = localStorage.getItem("todos");
const currentToDos = localStorageValueRaw
  ? JSON.parse(localStorageValueRaw)
  : [];

currentToDos.forEach((currentToDo) => {
  appendToDo(currentToDo);
});

function appendToDo(text) {
  const toDoElement = document.createElement("div");
  toDoElement.classList.add("ToDo");
  toDoElement.innerHTML = `
  <p>${text}</p>
  <button class="RemoveInputButton Button--Icon">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
  </button>
  `;
  toDoSectionElement.appendChild(toDoElement);

  const removeInputButtonElement =
    toDoElement.querySelector(".RemoveInputButton");
  removeInputButtonElement.addEventListener("click", () => {
    toDoElement.remove();
    const toDoIndex = currentToDos.findIndex((todo) => {
      if (todo === text) {
        return true;
      }
    });
    currentToDos.splice(toDoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(currentToDos));
  });
}

toDoFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = toDoInputElement.value;

  appendToDo(inputValue);

  currentToDos.push(inputValue);
  localStorage.setItem("todos", JSON.stringify(currentToDos));
});
