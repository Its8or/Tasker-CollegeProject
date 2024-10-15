const contentInput = document.getElementById('content');
                const dueDateInput = document.getElementById('due-date');
                const prioritySelect = document.getElementById('priority');
                const taskOngoingDiv = document.getElementById('task-ongoing');
                const filterTasksSelect = document.getElementById('filter-tasks');
            
                function loadTasks() {
                    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                    tasks.forEach(createTaskElement);
                }
            
                function createTaskElement({ content, dueDate, priority, completed = false }) {
                    const taskDiv = document.createElement('div');
                    taskDiv.className = 'task-item';
                    taskDiv.innerHTML = `
                        <span style="${completed ? 'text-decoration: line-through;' : ''}">
                            ${content} - Vencimento: ${dueDate} - Prioridade: ${priority}
                        </span>
                    `;
            
                    ['Concluir', 'Editar', 'Remover'].forEach(text => {
                        const button = document.createElement('button');
                        button.textContent = text;
                        button.onclick = text === 'Concluir' ? () => {
                            taskDiv.style.textDecoration = 'line-through';
                            updateTask(content, true);
                            button.disabled = true;
                        } : text === 'Editar' ? () => {
                            contentInput.value = content;
                            dueDateInput.value = dueDate;
                            prioritySelect.value = priority;
                            removeTask(content); // Remove a tarefa atual para poder adicionar a editada
                        } : () => {
                            taskOngoingDiv.removeChild(taskDiv);
                            removeTask(content);
                        };
                        taskDiv.appendChild(button);
                    });
            
                    taskOngoingDiv.appendChild(taskDiv);
                }
            
                function updateTask(content, completed) {
                    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                    const index = tasks.findIndex(task => task.content === content);
                    if (index !== -1) {
                        tasks[index].completed = completed;
                    } else {
                        const dueDate = dueDateInput.value;
                        const priority = prioritySelect.value;
                        tasks.push({ content, dueDate, priority, completed });
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
                        createTaskElement({ content: taskContent, dueDate: dueDateInput.value, priority: prioritySelect.value });
                        updateTask(taskContent, false);
                        contentInput.value = '';
                        dueDateInput.value = '';
                        prioritySelect.value = 'Indefinido';
                    } else alert('Por favor, insira uma tarefa!');
                };
            
                document.getElementById('cancel-item').onclick = () => {
                    contentInput.value = '';
                    dueDateInput.value = '';
                    prioritySelect.value = 'Indefinido';
                };
            
                filterTasksSelect.onchange = filterTasks;
            
                loadTasks();