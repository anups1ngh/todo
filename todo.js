let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? "checked" : ""}
        class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo8nNz9VJ6oIVgXzFywpuf6OwRSX1_crIkYQ&usqp=CAU" class="delete" data-id="${task.id}" />
    `;
    tasksList.append(li);
}

function renderList() {
    tasksList.innerHTML = ""
    for (let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);

    }
    tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
    const task = tasks.filter((task) => {
        return task.id === taskId;
    })
    if (task.length > 0) {
        const currentTask = task[0];
        currentTask.done = !currentTask.done
        renderList();
        showNotification("Task toggled successfully");
        return
    }
    showNotification("Can't toggle task");
}

function deleteTask(taskId) {
    const newTask = tasks.filter((task) => {
        return task.id !== taskId;
    })
    tasks = newTask;
    renderList();
    showNotification("Task deleted successfully");
}

function addTask(task) {
    if (task) {
        tasks.push(task);
        renderList();
        showNotification("Task added successfully");
        return;
    }
    showNotification("Task can't be added");
}

function showNotification(text) {
    alert(text);
}

function handlekeypress(e) {
    if (e.key === "Enter") {
        const text = e.target.value;
        if (!text) {
            showNotification("Task value can't be empty");
            return;
        }
        const task = {
            text,
            id: Date.now().toString(),
            done: false
        }
        e.target.value = '';
        addTask(task);
    }
}

function handleclickevent(e) {
    const target = e.target;
    if (target.className === 'delete') {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if (target.className === 'custom-checkbox') {
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}
function startAPI() {
    addTaskInput.addEventListener('keyup', handlekeypress);
    document.addEventListener('click', handleclickevent);
}

startAPI();