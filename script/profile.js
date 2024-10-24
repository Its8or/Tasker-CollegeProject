function loadUserData() {
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    const userBirthdate = localStorage.getItem('userBirthdate');
    const userProfilePic = localStorage.getItem('userProfilePic');

    // Aqui é onde os dados cadrastados são armazenados
    document.getElementById('email').innerText = userEmail || "Usuário não logado.";
    document.getElementById('name').value = userName || '';
    document.getElementById('birthdate').value = userBirthdate || '';
    document.getElementById('profilePic').src = userProfilePic || 'default-profile.png'; // Aqui é a imagem padrão que o site vai usar pra foto do usuario
}

function toggleForms() {
    const loginContainer = document.getElementById('login-container');
    const signupContainer = document.getElementById('signup-container');
    if (loginContainer.style.display === "none") {
        loginContainer.style.display = "flex";
        signupContainer.style.display = "none";
    } else {
        loginContainer.style.display = "none";
        signupContainer.style.display = "flex";
    }
}

function saveUserData() {
    const name = document.getElementById('name').value;
    const birthdate = document.getElementById('birthdate').value;
    const profilePic = document.getElementById('profilePicInput').files[0];

    if (profilePic) {
        const reader = new FileReader();
        reader.onload = function (event) {
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
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    localStorage.removeItem('userName');
    localStorage.removeItem('userBirthdate');
    localStorage.removeItem('userProfilePic');
    window.location.href = "Tela-de-login.html";
}

window.onload = loadUserData;
