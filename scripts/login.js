// login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();  // Evita que el formulario se envíe automáticamente

        // Obtén los valores del formulario
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Llama al módulo de autenticación para validar el inicio de sesión
        const isAuthenticated = await Auth.login(username, password);

        if (isAuthenticated) {
            // Si la autenticación es exitosa, redirige al dashboard o página principal
            window.location.href = 'index.html';
        } else {
            // Si falla, muestra el mensaje de error
            errorMessage.textContent = 'Usuario o contraseña incorrectos';
            errorMessage.style.display = 'block';
        }
    });
});
