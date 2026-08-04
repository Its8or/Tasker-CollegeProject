// ----------- Variables for 'Create Task' section -----------
const taskTittle = document.getElementById("tittleTask");
const taskDate = document.getElementById("dueTask");
const taskSubmit = document.getElementById("submitButton");
const taskCancel = document.getElementById("cancelButton");
const tasksList = document.querySelector(".tasksList");
const taskForm = document.querySelector(".inputTaskInfo");

// --- Variables for filter tasks in 'Task viewer' section ---
const filter = document.getElementById("taskStatus");
filter.addEventListener("change", renderTasks);

// Load tasks or return new one
let tasks = JSON.parse(localStorage.getItem('storedTasks')) || [];

// Controller to Edition Mode
let taskIdToEdit = null;

if (taskCancel) {
    taskCancel.addEventListener("click", cancelEdit);
}

function cancelEdit() {
    taskIdToEdit = null;
    taskTittle.value = "";
    taskDate.value = "";
    taskSubmit.textContent = "Send";
    renderTasks();
}

// Prevents the form from reloading the page upon submission.
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    submitTask();
});

// Generates a simple unique ID for each task.
function createTaskId() {
    return Math.random().toString(36).substr(2, 9);
}

// ------------- Funções principais do CRUD -------------

function submitTask() {
    const titleValue = taskTittle.value.trim();

    if (titleValue === "") {
        return false;
    }

    if (taskIdToEdit !== null) {
        // --- EDIT MODE ---
        // Updates existing task in array
        tasks = tasks.map(task => {
            if (task.taskId === taskIdToEdit) {
                task.taskTittle = titleValue;
                task.taskDate = taskDate.value || "";
            }
            return task;
        });

        // Reset Editing State
        taskIdToEdit = null;
        taskSubmit.textContent = "Send"; // Volta o botão ao texto original

    } else {
        // --- CREATION MODE ---
        const contentTask = {
            taskId: createTaskId(),
            taskTittle: titleValue,
            taskState: "todo",
            taskDate: taskDate.value || "",
            isBookmarked: false
        };
        tasks.push(contentTask);
    }

    // Save & Load Tasks
    saveToLocalStorage();
    renderTasks();

    // Empty Inputs
    taskTittle.value = "";
    taskDate.value = "";

    return true;
}

function deleteTask(idToDelete) {

    if (idToDelete === taskIdToEdit) {
        cancelEdit();
    }

    tasks = tasks.filter(task => task.taskId !== idToDelete);
    saveToLocalStorage();
    renderTasks();
}

function changeStatusTask(idToChange) {
    tasks = tasks.map(task => {
        if (task.taskId === idToChange) {
            task.taskState = task.taskState === "todo" ? "done" : "todo";
            if (task.taskState === "done") {
                task.isBookmarked = false;

                // If task on EDIT MODE has just been completed, cancel the edit.
                if (idToChange === taskIdToEdit) {
                    taskIdToEdit = null;
                    taskTittle.value = "";
                    taskDate.value = "";
                    taskSubmit.textContent = "Send";
                }
            }
        }
        return task;
    });
    saveToLocalStorage();
    renderTasks();
}

function toggleBookmark(idToToggle) {
    tasks = tasks.map(task => {
        if (task.taskId === idToToggle) {
            if (task.taskState === "done") {
                task.isBookmarked = false;
            } else {
                task.isBookmarked = !task.isBookmarked;
            }
        }
        return task;
    });
    saveToLocalStorage();
    renderTasks();
}

function editTask(idToEdit) {
    const task = tasks.find(t => t.taskId === idToEdit);
    if (!task) return;

    if (task.taskState != 'done') {

        taskIdToEdit = idToEdit;

        taskTittle.value = task.taskTittle;
        taskDate.value = task.taskDate === "" ? "" : task.taskDate;
        taskSubmit.textContent = "Save";

        taskTittle.focus();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('storedTasks', JSON.stringify(tasks));
}

function renderTasks() {
    tasksList.innerHTML = "";

    const template = document.querySelector(".templateTaskItem");
    const currentFilter = filter.value;

    const sortedTasks = [...tasks].sort((a, b) => {
        return (b.isBookmarked ? 1 : 0) - (a.isBookmarked ? 1 : 0);
    });

    if (taskCancel) {
        taskCancel.style.visibility = taskIdToEdit !== null ? "visible" : "hidden";
    }

    sortedTasks.forEach(task => {
        if (currentFilter !== "any" && task.taskState !== currentFilter) {
            return;
        }

        // conteiner for template elements
        const taskWrapper = document.createElement("div");
        taskWrapper.classList.add("templateTaskItem");
        taskWrapper.setAttribute("data-id", task.taskId);

        // Clone template content
        const clone = template.content.cloneNode(true);

        // Select ALL buttons and elements of cloned HMTL
        const titleEl = clone.querySelector(".contentTittleTask");
        const statusEl = clone.querySelector(".statusTagTask");
        const dateEl = clone.querySelector(".dateTagTask");
        const bookmarkUnchecked = clone.querySelector(".bookmark-unchecked");
        const bookmarkChecked = clone.querySelector(".bookmark-checked");

        // Select Buttons
        const stateBtn = clone.querySelector(".stateTaskButton");
        const deleteBtn = clone.querySelector(".deleteTaskButton");
        const editBtn = clone.querySelector(".editTaskButton");

        // Edit template style to display flex
        taskWrapper.style.display = "flex";

        // Inject task data in corresponding elements
        titleEl.textContent = task.taskTittle;
        statusEl.textContent = task.taskState === "todo" ? "To-do" : "Done";
        dateEl.textContent = task.taskDate;
        
        // Dynamically style done task
        if (task.taskState === "done") {
            titleEl.style.textDecoration = "line-through";
            titleEl.style.opacity = "0.6";
            if (task.isBookmarked === true) task.isBookmarked = false;
        }

        // Controls bookmark
        if (task.isBookmarked) {
            bookmarkUnchecked.style.display = "none";
            bookmarkChecked.style.display = "block";
        } else {
            bookmarkUnchecked.style.display = "block";
            bookmarkChecked.style.display = "none";
        }

        // Change Style of editBtn to disabled if task done
        if (task.taskState == 'done') {
            editBtn.disabled = true;
            editBtn.style.opacity = "0.35";
        }

        // Assigns click events to each button using the task ID.
        stateBtn.addEventListener("click", () => changeStatusTask(task.taskId));
        deleteBtn.addEventListener("click", () => deleteTask(task.taskId));
        editBtn.addEventListener("click", () => editTask(task.taskId));

        bookmarkUnchecked.addEventListener("click", () => toggleBookmark(task.taskId));
        bookmarkChecked.addEventListener("click", () => toggleBookmark(task.taskId));

        // Inserts the clone into the wrapper and the wrapper into the main list
        taskWrapper.appendChild(clone);
        tasksList.appendChild(taskWrapper);
    });
}

// ------------- Set a minimum date for the task -------------
const hoje = new Date();
const fusoHorario = hoje.getTimezoneOffset() * 60000;
const dataLocal = new Date(hoje - fusoHorario).toISOString().split('T')[0];
taskDate.min = dataLocal;

// Primeira renderização ao carregar a página
renderTasks();