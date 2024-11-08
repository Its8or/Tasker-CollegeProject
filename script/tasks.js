// Obtém referências aos elementos HTML para facilitar a manipulação no JavaScript
const contentInput = document.getElementById('content'); // Entrada para o conteúdo da tarefa (campo de texto)
const dueDateInput = document.getElementById('due-date'); // Entrada para a data de vencimento da tarefa
const taskOngoingDiv = document.getElementById('task-ongoing'); // Div onde as tarefas em andamento serão exibidas
const filterTasksSelect = document.getElementById('filter-tasks'); // Select para filtrar as tarefas (concluídas, pendentes, todas)

// Função para carregar as tarefas do localStorage e exibi-las na página
function loadTasks() {
    // Obtém as tarefas salvas no localStorage ou um array vazio caso não exista
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Para cada tarefa, cria um elemento visual na página
    tasks.forEach(createTaskElement);
}

// Função para criar e exibir um elemento visual para cada tarefa
function createTaskElement({ content, dueDate, completed = false }) {
    // Cria uma div para a tarefa
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-item'; // Atribui a classe CSS 'task-item' à div da tarefa

    // Cria um texto que mostra o conteúdo da tarefa e a data de vencimento (se houver)
    const dueDateText = dueDate ? ` - Vencimento: ${dueDate}` : ''; // Se houver data de vencimento, exibe a string correspondente

    // Cria um span para o conteúdo da tarefa
    const taskSpan = document.createElement('span');
    taskSpan.className = 'task'; // Atribui a classe CSS 'task' ao span
    taskSpan.style.textDecoration = completed ? 'line-through' : ''; // Se a tarefa estiver concluída, aplica o texto com linha cortada
    taskSpan.textContent = `${content}${dueDateText}`; // Atribui o conteúdo e a data de vencimento ao texto do span
    taskDiv.appendChild(taskSpan); // Adiciona o span à div da tarefa

    // Cria um container para os botões de ação da tarefa (Concluir, Editar, Remover)
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container'; // Atribui a classe CSS 'button-container' ao container de botões

    // Cria os três botões: Concluir, Editar e Remover
    ['Concluir', 'Editar', 'Remover'].forEach(text => {
        const button = document.createElement('button'); // Cria um botão
        button.classList.add('task-button'); // Atribui a classe CSS 'task-button' ao botão
        button.textContent = text; // Define o texto do botão

        // Define o comportamento de cada botão com base no seu texto
        button.onclick = text === 'Concluir' ? () => {
            taskSpan.style.textDecoration = 'line-through'; // Marca a tarefa como concluída (adiciona a linha)
            updateTask(content, true); // Atualiza a tarefa no localStorage como concluída
            button.disabled = true; // Desabilita o botão de concluir após ser clicado
        } : text === 'Editar' ? () => {
            // Preenche os campos de edição com os dados da tarefa
            contentInput.value = content;
            dueDateInput.value = dueDate;
            removeTask(content); // Remove a tarefa da lista antes de editar
        } : () => {
            // Remove a tarefa da página e do localStorage
            taskOngoingDiv.removeChild(taskDiv); 
            removeTask(content);
        };

        buttonContainer.appendChild(button); // Adiciona o botão ao container de botões
    });

    taskDiv.appendChild(buttonContainer); // Adiciona o container de botões à div da tarefa
    taskOngoingDiv.appendChild(taskDiv); // Adiciona a div da tarefa à div principal na página
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
    contentInput.value = ''; // Limpa o campo de conteúdo
    dueDateInput.value = ''; // Limpa o campo de data de vencimento
};

// Evento disparado quando o filtro de tarefas é alterado
filterTasksSelect.onchange = filterTasks;

// Carrega as tarefas ao carregar a página
loadTasks();
