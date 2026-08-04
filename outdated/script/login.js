function handleLogin(event) {// Impede o comportamento padrão do formulário, que recarregaria a página ao enviar
    event.preventDefault();
// Lógica adicional de login aqui

    // Obtém os valores dos campos de entrada
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    // Salva os dados no localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password); // A senha talvez não tenha funcionalidade de fato como proteção de conta, mas para simplicidade é suficiente.

    window.location.href = "index.html"; // Redireciona para a página de perfil
}