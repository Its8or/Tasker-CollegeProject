function loadUserData() {
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    const userBirthdate = localStorage.getItem('userBirthdate');
    const userProfilePic = localStorage.getItem('userProfilePic');

    // Aqui é onde os dados cadrastados são armazenados
    document.getElementById('email').innerText = userEmail || "Usuário não logado.";
    document.getElementById('name').value = userName || '';
    document.getElementById('birthdate').value = userBirthdate || '';
    document.getElementById('profilePic').src = userProfilePic || '/images/profile-pic.png'; // Aqui é a imagem padrão que o site vai usar pra foto do usuario
}

function toggleForms() {
    // Obtém os elementos dos contêineres de login e de cadastro pelo ID
    const loginContainer = document.getElementById('login-container');
    const signupContainer = document.getElementById('signup-container');
// Verifica se o contêiner de login está oculto
    if (loginContainer.style.display === "none") {
    // Exibe o contêiner de login e oculta o contêiner de cadastro
        loginContainer.style.display = "flex";
        signupContainer.style.display = "none";
    } else {
    // Oculta o contêiner de login e exibe o contêiner de cadastro    
        loginContainer.style.display = "none";
        signupContainer.style.display = "flex";
    }
}

function saveUserData() {
    // Obtém o valor dos campos nome, data de nascimento e imagem de perfil
    const name = document.getElementById('name').value;
    const birthdate = document.getElementById('birthdate').value;
    const profilePic = document.getElementById('profilePicInput').files[0];

    // Se o usuário escolheu uma imagem de perfil, lê o arquivo
    if (profilePic) {
        const reader = new FileReader();
        reader.onload = function (event) {
        
        // Armazena a imagem em formato de base64 no localStorage e exibe-a    
            localStorage.setItem('userProfilePic', event.target.result);
            document.getElementById('profilePic').src = event.target.result;
        };
        reader.readAsDataURL(profilePic);
    }

    localStorage.setItem('userName', name);
    localStorage.setItem('userBirthdate', birthdate);
    alert("Dados salvos com sucesso!");
}

function logout() {
    // Remove os dados do usuário do localStorage (email, senha, nome, data de nascimento e imagem de perfil)
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    localStorage.removeItem('userName');
    localStorage.removeItem('userBirthdate');
    localStorage.removeItem('userProfilePic');
// Redireciona o usuário para a tela de login    
    window.location.href = "Tela-de-login.html";
}
// Carrega os dados do usuário ao carregar a página
window.onload = loadUserData;
