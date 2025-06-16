const toDoInputElement = document.querySelector("#to-do-input");
const saveButtonElement = document.querySelector("#to-do-save-button");
const toDoSectionElement = toDoInputElement.closest(".Section");
const toDoFormElement = document.querySelector(".ToDoForm");

const TODOS_LOCAL_STORAGE_KEY = "todos";

function getTodosFromLocalStorage() {
  const localStorageValueRaw = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);

  return localStorageValueRaw ? JSON.parse(localStorageValueRaw) : [];
}

function addEventListenersToTodo(todoElement) {
  const checkmarkButtonElement = todoElement.querySelector(".CheckmarkButton");
  const editButtonElement = todoElement.querySelector(".EditButton");
  const removeButtonElement = todoElement.querySelector(".RemoveButton");

  // Logic for checkmark button.

  checkmarkButtonElement.addEventListener("click", () => {
    const currentToDos = getTodosFromLocalStorage();
    const text = todoElement.querySelector(".ToDo__Text").textContent;
    const toDoIndex = currentToDos.findIndex((todo) => todo.text === text);

    // Update the done status of the todo item in local storage.

    const updatedTodos = currentToDos.map((todo, index) => {
      if (index === toDoIndex) {
        return {
          ...todo,
          done: !todo.done, // Toggle the done status.
        };
      }
      return todo;
    });

    localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));

    // Update UI state last.
    todoElement.classList.toggle("ToDo--Success");
  });

  // Logic for edit button.

  editButtonElement.addEventListener("click", () => {
    const textElement = todoElement.querySelector(".ToDo__Text");
    const inputElement = todoElement.querySelector(".ToDo__Input");

    const currentToDos = getTodosFromLocalStorage();
    const isEditing = inputElement.classList.contains("ToDo__Input--Active");

    const todoIndex = [...document.querySelectorAll(".ToDo")].findIndex(
      (todo) => todo === todoElement,
    );

    if (isEditing) {
      const newValue = inputElement.value.trim();

      if (newValue !== "") {
        textElement.textContent = newValue;

        currentToDos[todoIndex].text = newValue;

        localStorage.setItem(
          TODOS_LOCAL_STORAGE_KEY,
          JSON.stringify(currentToDos),
        );
      }

      textElement.classList.add("ToDo__Text--Active");
      inputElement.classList.remove("ToDo__Input--Active");
    } else {
      inputElement.value = textElement.textContent;
      textElement.classList.remove("ToDo__Text--Active");
      inputElement.classList.add("ToDo__Input--Active");

      inputElement.focus();
    }
  });

  // Logic for remove button.

  removeButtonElement.addEventListener("click", () => {
    const currentTodos = getTodosFromLocalStorage();
    const text = todoElement.querySelector(".ToDo__Text").textContent;

    const toDoIndex = currentTodos.findIndex((todo) => todo.text === text);

    const updatedTodos = currentTodos.splice(toDoIndex, 1);
    localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));

    // Remove the todo element from the UI.
    todoElement.remove();
  });
}

function appendToDo(toDoItem) {
  const toDoElement = document.createElement("div");

  toDoElement.classList.add("ToDo");

  if (toDoItem.done) {
    toDoElement.classList.add("ToDo--Success");
  }

  toDoElement.innerHTML = `
    <p class="ToDo__Text ToDo__Text--Active Text">${toDoItem.text}</p>
    <input class="ToDo__Input Input" value="${toDoItem.text}" />
    <div class="IconGroup">
      <button class="CheckmarkButton Button--Icon">
        <div class="Icon Icon--Success">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-check-big-icon lucide-square-check-big"><path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"/><path d="m9 11 3 3L22 4"/></svg>
        </div>
      </button>

      <button class="EditButton Button--Icon">
        <div class="Icon Icon--Warning">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-pen-icon lucide-file-pen"><path d="M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/></svg>
        </div>
      </button>

      <button class="RemoveButton Button--Icon">
        <div class="Icon Icon--Destructive">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
        </div>
      </button>
    </div>
  `;

  toDoSectionElement.appendChild(toDoElement);

  return toDoElement;
}

toDoFormElement.addEventListener("submit", (event) => {
  // Prevent the default form submission behavior.
  event.preventDefault();

  const inputValue = toDoInputElement.value.trim();

  // Ignore empty input values.
  if (inputValue === "") return;

  const newTodoItem = {
    text: inputValue,
    done: false,
  };

  const updatedTodos = [...getTodosFromLocalStorage(), newTodoItem];

  const newTodoElement = appendToDo(newTodoItem);

  addEventListenersToTodo(newTodoElement);

  localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));

  // Clear the input field after adding the todo item.
  toDoInputElement.value = "";
});

// Load existing todos from local storage when page loads. Then append them to the Todo section.

const todoData = getTodosFromLocalStorage();

todoData.forEach((todo) => {
  const newTodoElement = appendToDo(todo);

  addEventListenersToTodo(newTodoElement);
});
