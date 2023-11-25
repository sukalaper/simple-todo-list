document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.getElementById("todo-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  let editedTask = null;
  let taskCount = 0;
  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      if (editedTask) {
        editTask(editedTask, taskText);
        editedTask = null;
      } else {
        addTask(taskText, ++taskCount);
      }
      taskInput.value = "";
    }
  });
  function addTask(text, count) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
          <span>${count}. ${text}</span>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
          <button class="complete">Selesai</button>
        `;
    taskList.appendChild(taskItem);
  }
  taskList.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("edit")) {
      const taskItem = target.parentElement;
      editTaskForm(taskItem);
    } else if (target.classList.contains("delete")) {
      deleteTask(target.parentElement);
    } else if (target.classList.contains("complete")) {
      toggleTaskStatus(target.parentElement);
    } else if (target.tagName.toLowerCase() === "li") {
      if (!editedTask || editedTask !== target) {
        editTaskForm(target);
      }
    }
  });
  function toggleTaskStatus(taskItem) {
    taskItem.classList.toggle("completed");
  }
  function deleteTask(taskItem) {
    taskList.removeChild(taskItem);
  }
  function editTaskForm(taskItem) {
    taskInput.value = taskItem.querySelector("span").textContent;
    editedTask = taskItem;
  }
  function editTask(taskItem, newText) {
    const spanElement = taskItem.querySelector("span");
    spanElement.textContent = newText;
    editedTask = null;
  }
});
