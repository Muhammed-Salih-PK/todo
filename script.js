document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();
  if (taskText === "") return;

  let li = document.createElement("li");
  li.innerHTML = `<span class="task-text" onclick="toggleComplete(this)">${taskText}</span>
                <input type="text" class="edit-input" value="${taskText}" onblur="saveEdit(this)" onkeypress="handleKeyPress(event, this)">
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>`;

  document.getElementById("taskList").appendChild(li);
  saveTasks();
  taskInput.value = "";
}

function toggleComplete(task) {
  task.classList.toggle("completed");
  saveTasks();
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function editTask(button) {
  let li = button.parentElement;
  let textSpan = li.querySelector(".task-text");
  let inputField = li.querySelector(".edit-input");

  textSpan.style.display = "none";
  inputField.style.display = "block";
  inputField.focus();
}

function saveEdit(inputField) {
  let li = inputField.parentElement;
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
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.querySelector(".task-text").textContent,
      completed: li.querySelector(".task-text").classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = `<span class="task-text" onclick="toggleComplete(this)" class="${
      task.completed ? "completed" : ""
    }">${task.text}</span>
                    <input type="text" class="edit-input" value="${
                      task.text
                    }" onblur="saveEdit(this)" onkeypress="handleKeyPress(event, this)">
                    <button onclick="editTask(this)">Edit</button>
                    <button onclick="deleteTask(this)">Delete</button>`;
    document.getElementById("taskList").appendChild(li);
  });
}
