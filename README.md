# 📋 Tasker - College Project

> **Tasker** é uma aplicação web de gerenciamento de tarefas desenvolvida como projeto acadêmico. O objetivo principal do projeto é oferecer uma interface simples, intuitiva e funcional para organizar atividades, acompanhar prazos e gerenciar rotinas de estudo e trabalho.

---

## 📌 Sumário
- [📖 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [🎨 Estilização e Design](#-estilização-e-design)
- [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
- [🌿 Estrutura de Branches & Git](#-estrutura-de-branches--git)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

---

## 📖 Sobre o Projeto

O **Tasker** foi criado no âmbito acadêmico para demonstrar a aplicação de conceitos de desenvolvimento web frontend, arquitetura de software, organização de estilos CSS com variáveis globais e controle de versão com Git.

A aplicação permite ao usuário criar, organizar, filtrar e gerenciar suas tarefas diárias de forma eficiente, contando com uma interface visual limpa e responsiva.

---

## ✨ Funcionalidades

- ➕ **Criação de Tarefas:** Adicione novas tarefas com título, descrição, prazo e prioridade.
- ✏️ **Edição e Remoção:** Atualize as informações de tarefas existentes ou remova tarefas concluídas.
- ✅ **Status de Conclusão:** Marque tarefas como pendentes ou concluídas.
- 🔍 **Filtros e Busca:** Encontre rapidamente tarefas por categoria, status ou prioridade.
- 🎯 **Ações Rápidas:** Botões interativos para alteração rápida de status, exclusão e edição.
- 📱 **Design Responsivo:** Adaptado para diferentes tamanhos de tela (mobile e desktop).

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica da aplicação.
- **CSS3:** Estilização moderna utilizando `:root` CSS variables para gerenciamento centralizado de cores e temas.
- **JavaScript (ES6+):** Lógica da aplicação, manipulação do DOM e gerenciamento de estado das tarefas.

---

## 🎨 Estilização e Design

O projeto utiliza um sistema de design baseado em variáveis de ambiente CSS (`:root`), facilitando a manutenção e futuras personalizações de temas (como Dark Mode):

```css
:root {
    --backgroundColor: #0f172a;
    --sections: #1e293b;
    
    --color: #f8fafc;
    --effect: #6366f1;
    --input: #e2e8f0;

    /* Colors for buttons */
    --sendTask: #334155;
    --completeTask: #10b981;
    --editTask: #3b82f6;
    --delTask: #ef4444;
    
    --tagTodo: #fbbf24;
    --tagDone: #34d399;
}
```

Os botões de ação contam com estilos dedicados e transições suaves para garantir excelente experiência do usuário (UX).

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Apenas um navegador web moderno (Google Chrome, Firefox, Edge ou Safari) e o Git instalado em sua máquina.

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/its8or/Tasker-CollegeProject.git
   ```

2. **Acessar o diretório do projeto:**
   ```bash
   cd Tasker-CollegeProject
   ```

3. **Abrir a aplicação:**
   - Abra o arquivo `index.html` diretamente em seu navegador, ou
   - Utilize a extensão **Live Server** no VS Code para uma melhor experiência de desenvolvimento.

---

## 🤝 Contribuição

Contribuições para o aprimoramento deste projeto acadêmico são bem-vindas!

1. Faça um **Fork** do repositório.
2. Crie uma branch para a sua funcionalidade (`git checkout -b feature/nova-funcionalidade`).
3. Faça os **Commits** das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie as alterações para a sua branch (`git push origin feature/nova-funcionalidade`).
5. Abra um **Pull Request**.

---

## 📄 Licença

Este projeto é de fins acadêmicos e educacionais. Sinta-se livre para estudar, modificar e reutilizar o código conforme necessário.
