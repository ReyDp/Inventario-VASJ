document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === 'admin' && password === 'password123') {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'index.html';
    } else {
        document.getElementById('login-error').textContent = 'Usuario o contraseña incorrectos.';
    }
});
