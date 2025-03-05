document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();
  if (taskText === "") return;

  let li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" class="task-checkbox" onclick="toggleComplete(this)">
                <span class="task-text">${taskText}</span>
                <input type="text" class="edit-input" value="${taskText}" onblur="saveEdit(this)" onkeypress="handleKeyPress(event, this)">
                <div class="containerAdd">
                  <button onclick="editTask(this)">Edit</button>
                  <button onclick="deleteTask(this)">Delete</button>
                </div>`;

  document.getElementById("taskList").appendChild(li);
  saveTasks();
  taskInput.value = "";
}

function toggleComplete(checkbox) {
  let li = checkbox.parentElement;
  let taskText = li.querySelector(".task-text");

  if (checkbox.checked) {
    taskText.classList.add("completed");
    document.getElementById("completedTasks").appendChild(li);
  } else {
    taskText.classList.remove("completed");
    document.getElementById("taskList").appendChild(li);
  }

  saveTasks();
}

function deleteTask(button) {
  button.parentElement.parentElement.remove();
  saveTasks();
}

function editTask(button) {
  let li = button.parentElement.parentElement;
  let textSpan = li.querySelector(".task-text");
  let inputField = li.querySelector(".edit-input");

  textSpan.style.display = "none";
  inputField.style.display = "block";
  inputField.focus();
}

function saveEdit(inputField) {
  let li = inputField.parentElement.parentElement;
  let textSpan = li.querySelector(".task-text");

  if (inputField.value.trim() !== "") {
    textSpan.textContent = inputField.value;
  }

  textSpan.style.display = "block";
  inputField.style.display = "none";
  saveTasks();
}

function handleKeyPress(event, inputField) {
  if (event.key === "Enter") {
    saveEdit(inputField);
  }
}

function saveTasks() {
  let tasks = [];
  document
    .querySelectorAll("#taskList li, #completedTasks li")
    .forEach((li) => {
      tasks.push({
        text: li.querySelector(".task-text").textContent,
        completed: li.querySelector(".task-checkbox").checked,
      });
    });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" class="task-checkbox" ${
      task.completed ? "checked" : ""
    } onclick="toggleComplete(this)">
                    <span class="task-text ${
                      task.completed ? "completed" : ""
                    }">${task.text}</span>
                    <input type="text" class="edit-input" value="${
                      task.text
                    }" onblur="saveEdit(this)" onkeypress="handleKeyPress(event, this)">
                    <div class="containerAdd">
                      <button onclick="editTask(this)">Edit</button>
                      <button onclick="deleteTask(this)">Delete</button>
                    </div>`;

    if (task.completed) {
      document.getElementById("completedTasks").appendChild(li);
    } else {
      document.getElementById("taskList").appendChild(li);
    }
  });
}
