const Navigation = (() => {
    const menuLinks = document.querySelectorAll('.sidebar ul li a');
    const sections = document.querySelectorAll('.section');
    
    // Obtener el enlace de "Cerrar sesión" y el modal
    const logoutLink = document.getElementById('logout');
    const logoutModal = document.getElementById('logout-modal');
    const confirmLogoutBtn = document.getElementById('confirm-logout');
    const cancelLogoutBtn = document.getElementById('cancel-logout');

    const showSection = (sectionId) => {
        sections.forEach(section => {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });

        switch (sectionId) {
            case 'list-products':
                UI.renderTable();
                break;
            case 'home':
                UI.loadLowStockProducts();
                break;
            case 'reports':
                Charts.createChart();
                break;
            case 'add-qr':
                QR.initializeQRScanner();
                break;
            default:
                break;
        }
    };

    const initializeNavigation = () => {
        // Manejar navegación normal
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                showSection(section);
            });
        });

        // Manejar cierre de sesión con modal
        if (logoutLink) {
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault(); // Prevenir comportamiento por defecto
                
                // Mostrar el modal de confirmación
                logoutModal.style.display = 'flex';
            });
        }

        // Si el usuario acepta el cierre de sesión
        confirmLogoutBtn.addEventListener('click', () => {
            window.location.href = "login.html"; // Redirigir a login.html
        });

        // Si el usuario cancela el cierre de sesión
        cancelLogoutBtn.addEventListener('click', () => {
            logoutModal.style.display = 'none'; // Ocultar el modal
        });
    };

    return {
        initializeNavigation
    };
})();