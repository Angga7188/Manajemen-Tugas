localStorage.setItem('halamanTersimpan', document.body.innerHTML);
document.addEventListener("DOMContentLoaded", loadTasks);
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        addTaskToDOM(task.text, task.completed);
    });
}
// Menambahkan tugas ke dalam DOM dan localStorage
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTaskToDOM(taskText, false);
        saveTaskToLocalStorage(taskText, false);
        taskInput.value = "";
    }
}
// Menambahkan tugas ke dalam DOM
function addTaskToDOM(taskText, completed) {
    let li = document.createElement("li");
    li.textContent = taskText;
    li.className = completed ? "completed" : "";
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        updateTaskInLocalStorage(taskText);
    });
    // Tombol untuk menghapus tugas
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.addEventListener("click", function () {
        deleteTask(taskText, li);
    });
    li.appendChild(deleteButton);
    document.getElementById("taskList").appendChild(li);
}
function saveTaskToLocalStorage(taskText, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Memperbarui status tugas di localStorage
function updateTaskInLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map((task) => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Menghapus tugas dari DOM dan localStorage
function deleteTask(taskText, taskElement) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskElement.remove();
}
window.onload = function () {
    const halamanTersimpan = localStorage.getItem('halamanTersimpan');
    if (halamanTersimpan) {
        document.body.innerHTML = halamanTersimpan;
    }
}