// Função para carregar os dados do usuário armazenados no localStorage
function loadUserData() {
    // Obtém os dados do usuário armazenados no localStorage, como email, nome, data de nascimento e foto de perfil
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    const userBirthdate = localStorage.getItem('userBirthdate');
    const userProfilePic = localStorage.getItem('userProfilePic');

    // Exibe os dados do usuário nas respectivas seções da página
    // Se o email não estiver presente, exibe "Usuário não logado"
    document.getElementById('email').innerText = userEmail || "Usuário não logado.";
    // Preenche os campos de nome e data de nascimento com os dados salvos ou com valores vazios
    document.getElementById('name').value = userName || '';
    document.getElementById('birthdate').value = userBirthdate || '';
    // Atribui a imagem de perfil, se disponível, ou uma imagem padrão caso contrário
    document.getElementById('profilePic').src = userProfilePic || '/images/profile-pic.png'; 
}

// Função para alternar entre os formulários de login e cadastro
function toggleForms() {
    // Obtém os elementos que representam os contêineres de login e cadastro
    const loginContainer = document.getElementById('login-container');
    const signupContainer = document.getElementById('signup-container');
    
    // Verifica se o contêiner de login está oculto (caso contrário, significa que ele está visível)
    if (loginContainer.style.display === "none") {
        // Exibe o contêiner de login e oculta o de cadastro
        loginContainer.style.display = "flex";
        signupContainer.style.display = "none";
    } else {
        // Caso o contêiner de login esteja visível, oculta ele e exibe o de cadastro
        loginContainer.style.display = "none";
        signupContainer.style.display = "flex";
    }
}

// Função para salvar os dados do usuário no localStorage
function saveUserData() {
    // Obtém os valores dos campos de nome, data de nascimento e a imagem de perfil
    const name = document.getElementById('name').value;
    const birthdate = document.getElementById('birthdate').value;
    const profilePic = document.getElementById('profilePicInput').files[0];

    // Se o usuário escolheu uma imagem de perfil, lê o arquivo de imagem
    if (profilePic) {
        const reader = new FileReader();
        reader.onload = function (event) {
            // Converte a imagem para base64 e a armazena no localStorage
            localStorage.setItem('userProfilePic', event.target.result);
            // Atualiza a imagem de perfil visível na página com o arquivo recém carregado
            document.getElementById('profilePic').src = event.target.result;
        };
        reader.readAsDataURL(profilePic); // Lê o arquivo de imagem como uma URL base64
    }

    // Armazena o nome e a data de nascimento no localStorage
    localStorage.setItem('userName', name);
    localStorage.setItem('userBirthdate', birthdate);
    
    // Exibe uma mensagem de sucesso
    alert("Dados salvos com sucesso!");
}

// Função para realizar o logout do usuário e redirecionar para a página de login
function logout() {
    // Remove os dados do usuário do localStorage (email, senha, nome, data de nascimento e imagem de perfil)
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userEmail');  // Esta linha parece estar repetida, deve ser corrigida para 'userPassword'
    localStorage.removeItem('userPassword');
    localStorage.removeItem('userName');
    localStorage.removeItem('userBirthdate');
    localStorage.removeItem('userProfilePic');
    
    // Redireciona o usuário para a página de login
    window.location.href = "Tela-de-login.html";
}

// Carrega os dados do usuário quando a página for carregada
window.onload = loadUserData;
