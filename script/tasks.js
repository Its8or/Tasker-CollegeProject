const contentInput = document.getElementById('content'); // conteúdo da tarefa (campo de texto)
const dueDateInput = document.getElementById('due-date'); // data de vencimento da tarefa
const taskOngoingDiv = document.getElementById('task-ongoing'); // Div de exibição de tarefas
const filterTasksSelect = document.getElementById('filter-tasks'); // filtro para filtrar as tarefas (concluídas, pendentes, todas)

const currentDate = new Date(); // get data atual

function loadTasks() {
    // Obtém as tarefas salvas no localStorage ou um array vazio caso não exista
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement);
}

// Testa se data não é anterior a "hoje"
function checkDate(date) {
    return (date > currentDate) ? true : false;
}

function createTaskElement({ content, dueDate, completed = false }) {
    const task = document.createElement('div');
    const taskComplete = document.createElement('div');
    const taskContent = document.createElement('div');
    const dateContent = document.createElement('div');
    const buttonBox = document.createElement('div');
    const fullContent = document.createElement('div'); // junta taskContent + dateContent;

    const dueDateContent = dueDate; // Se houver: Cria data de vencimento

    fullContent.appendChild(taskComplete);
    fullContent.appendChild(taskContent);
    fullContent.appendChild(dateContent);

    // set content and style of TaskComplete. (Check icon)
    taskComplete.style.visibility = 'hidden';
    taskComplete.innerHTML = '✓';

    // set class names to elements
    task.className = 'taskTemplate';
    fullContent.className = 'taskFullContent'
    taskContent.className = 'taskContent';
    dateContent.className = 'taskDate'
    buttonBox.className = 'taskButtonBox';

    taskContent.textContent = `${content}`;
    dateContent.textContent = `${dueDateContent}`;

    ['Concluir', 'Editar', 'Remover'].forEach(text => {
        const button = document.createElement('button');

        button.classList.add('taskButtonBoxContent'); // Atribui a classe CSS 'task-button' ao botão
        button.textContent = text; // Define o conteúdo do botão
        
        button.onclick = text === 'Concluir' ? () => {
            updateTask(content, true); 
            button.disabled = true; 
            
        } : text === 'Editar' ? () => {
            // Preenche os campos de edição com os dados da tarefa
            
            contentInput.value = content;
            dueDateInput.value = dueDate;
            removeTask(content); // Remove a tarefa da lista antes de editar
        } : () => {
            // Remove a tarefa
            taskOngoingDiv.removeChild(task);
            removeTask(content);
        };

        buttonBox.appendChild(button); // Adiciona o botão ao container de botões
    });

    // stylization
    completed ? taskComplete.style.visibility = 'initial' : '' ;

    // appending
    task.appendChild(fullContent);
    task.appendChild(buttonBox);
    taskOngoingDiv.appendChild(task);
}

// Função para atualizar o status ou adicionar uma nova tarefa no localStorage
function updateTask(content, completed) {
    // Obtém as tarefas atuais do localStorage ou um array vazio se não houver tarefas
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Encontra o índice da tarefa com o mesmo conteúdo
    const index = tasks.findIndex(task => task.content === content);

    // Se a tarefa já existir, atualiza seu status de conclusão
    if (index !== -1) {
        tasks[index].completed = completed;
    } else {
        // Caso a tarefa não exista, adiciona uma nova tarefa com o conteúdo e a data de vencimento
        const dueDate = dueDateInput.value; // Obtém a data de vencimento da tarefa
        tasks.push({ content, dueDate, completed }); // Adiciona a nova tarefa ao array
    }

    // Salva o array de tarefas atualizado no localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    filterTasks(); // Atualiza a visualização das tarefas após a modificação
}

// Função para remover uma tarefa do localStorage
function removeTask(content) {
    // Obtém as tarefas atuais do localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Filtra as tarefas, removendo a tarefa com o conteúdo correspondente
    localStorage.setItem('tasks', JSON.stringify(tasks.filter(task => task.content !== content)));
    filterTasks(); // Atualiza a filtragem após remover a tarefa
}

// Função para filtrar e exibir as tarefas com base no critério selecionado
function filterTasks() {
    // Obtém as tarefas do localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Obtém o valor do filtro selecionado (all, completed, pending)
    const filterValue = filterTasksSelect.value;

    // Limpa as tarefas atualmente exibidas
    taskOngoingDiv.innerHTML = '';

    // Exibe as tarefas com base no filtro selecionado
    tasks.forEach(task => {
        // Exibe a tarefa dependendo do filtro escolhido
        if (filterValue === 'all' ||
            (filterValue === 'completed' && task.completed) ||
            (filterValue === 'pending' && !task.completed)) {
            createTaskElement(task); // Cria um elemento visual para a tarefa
        }
    });
}

// Evento disparado quando o botão de adicionar tarefa é clicado
document.getElementById('add-item').onclick = () => {
    const taskContent = contentInput.value.trim(); // Obtém o conteúdo da tarefa
    if (taskContent) {
        // Cria a tarefa e a adiciona na página e no localStorage
        createTaskElement({ content: taskContent, dueDate: dueDateInput.value });
        updateTask(taskContent, false); // Marca a tarefa como pendente
        contentInput.value = ''; // Limpa o campo de conteúdo
        dueDateInput.value = ''; // Limpa o campo de data de vencimento
    } else alert('Por favor, insira uma tarefa!'); // Alerta se o conteúdo da tarefa estiver vazio
};

// Evento disparado quando o botão de cancelar é clicado
document.getElementById('cancel-item').onclick = () => {
    contentInput.value = ''; // Limpa conteúdo
    dueDateInput.value = ''; // Limpa data de vencimento
};

filterTasksSelect.onchange = filterTasks;

loadTasks();
