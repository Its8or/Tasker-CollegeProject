const contentInput = document.getElementById('content');
const dueDateInput = document.getElementById('due-date');
const taskOngoingDiv = document.getElementById('task-ongoing');
const filterTasksSelect = document.getElementById('filter-tasks');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement);
}

function createTaskElement({ content, dueDate, completed = false }) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-item';

    const dueDateText = dueDate ? ` - Vencimento: ${dueDate}` : '';

    // Criação do span da tarefa
    const taskSpan = document.createElement('span');
    taskSpan.className = 'task';
    taskSpan.style.textDecoration = completed ? 'line-through' : '';
    taskSpan.textContent = `${content}${dueDateText}`;
    taskDiv.appendChild(taskSpan);

    // Criação do container para os botões
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container'; // botões manipuláveis, corrigido.

    ['Concluir', 'Editar', 'Remover'].forEach(text => {
        const button = document.createElement('button');
        button.classList.add('task-button');
        button.textContent = text;
        button.onclick = text === 'Concluir' ? () => {
            taskSpan.style.textDecoration = 'line-through';
            updateTask(content, true);
            button.disabled = true;
        } : text === 'Editar' ? () => {
            contentInput.value = content;
            dueDateInput.value = dueDate;
            removeTask(content); 
        } : () => {
            taskOngoingDiv.removeChild(taskDiv);
            removeTask(content);
        };
        buttonContainer.appendChild(button); // Adiciona os botões ao container
    });

    taskDiv.appendChild(buttonContainer); // Adiciona o container de botões ao taskDiv
    taskOngoingDiv.appendChild(taskDiv); // Adiciona a tarefa na div de tarefas
}

function updateTask(content, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.findIndex(task => task.content === content);
    if (index !== -1) {
        tasks[index].completed = completed;
    } else {
        const dueDate = dueDateInput.value;
        tasks.push({ content, dueDate, completed });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    filterTasks(); // Atualiza a filtragem após adicionar/editar
}

function removeTask(content) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    localStorage.setItem('tasks', JSON.stringify(tasks.filter(task => task.content !== content)));
    filterTasks(); // Atualiza a filtragem após remover
}

function filterTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filterValue = filterTasksSelect.value;

    // Limpa a lista antes de adicionar as tarefas filtradas
    taskOngoingDiv.innerHTML = '';

    tasks.forEach(task => {
        if (filterValue === 'all' ||
            (filterValue === 'completed' && task.completed) ||
            (filterValue === 'pending' && !task.completed)) {
            createTaskElement(task);
        }
    });
}

document.getElementById('add-item').onclick = () => {
    const taskContent = contentInput.value.trim();
    if (taskContent) {
        createTaskElement({ content: taskContent, dueDate: dueDateInput.value });
        updateTask(taskContent, false);
        contentInput.value = '';
        dueDateInput.value = '';
    } else alert('Por favor, insira uma tarefa!');
};

document.getElementById('cancel-item').onclick = () => {
    contentInput.value = '';
    dueDateInput.value = '';
};

filterTasksSelect.onchange = filterTasks;

loadTasks();
