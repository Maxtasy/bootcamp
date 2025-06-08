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

function appendToDo(toDoItem) {
  const toDoElement = document.createElement("div");
  toDoElement.classList.add("ToDo");
  if (toDoItem.done) {
    toDoElement.classList.add("ToDo--Success");
  }

  toDoElement.innerHTML = `
  <p>${toDoItem.text}</p>
  <div class="IconGroup">
    <button class="CheckmarkButton Button--Icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-check-big-icon lucide-square-check-big"><path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"/><path d="m9 11 3 3L22 4"/></svg>
    </button>

    <button class="RemoveButton Button--Icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
    </button>
  </div>
  `;
  toDoSectionElement.appendChild(toDoElement);

  const removeButtonElement = toDoElement.querySelector(".RemoveButton");
  removeButtonElement.addEventListener("click", () => {
    toDoElement.remove();
    const toDoIndex = currentToDos.findIndex((todo) => {
      if (todo === toDoItem) {
        return true;
      }
    });
    currentToDos.splice(toDoIndex);
    localStorage.setItem("todos", JSON.stringify(currentToDos));
  });

  const checkmarkButtonElement = toDoElement.querySelector(".CheckmarkButton");
  checkmarkButtonElement.addEventListener("click", () => {
    toDoElement.classList.toggle("ToDo--Success");
    const toDoIndex = currentToDos.findIndex((todo) => {
      if (todo === toDoItem) {
        return true;
      }
    });

    currentToDos[toDoIndex].done = !currentToDos[toDoIndex].done;

    localStorage.setItem("todos", JSON.stringify(currentToDos));
  });
}

toDoFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = toDoInputElement.value;

  const toDoItem = {
    text: inputValue,
    done: false,
  };

  appendToDo(toDoItem);

  currentToDos.push({
    text: inputValue,
    done: false,
  });

  localStorage.setItem("todos", JSON.stringify(currentToDos));

  toDoInputElement.value = "";
});
