// auth.js
const Auth = (function() {
    // Usuarios simulados (puedes cambiar esto a una llamada real de autenticación o localStorage)
    const users = [
        { username: 'admin', password: 'admin123' },
        { username: 'user1', password: 'user123' }
    ];

    // Función para validar el login
    async function login(username, password) {
        // Simula un retardo como si fuera una llamada a un servidor externo
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = users.find(user => user.username === username && user.password === password);
                resolve(!!user);  // Retorna true si encuentra un usuario válido
            }, 1000);
        });
    }

    return {
        login
    };
})();
