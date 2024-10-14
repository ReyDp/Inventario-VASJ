// auth.js

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Ejemplo simple de autenticación (esto debe reemplazarse con una autenticación real)
    if (username === 'admin' && password === 'password123') {
        // Redirigir a la página principal (index.html)
        window.location.href = 'index.html';
    } else {
        document.getElementById('login-error').textContent = 'Usuario o contraseña incorrectos.';
    }
});
