// Manejo del envío del formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de manera tradicional y recargue la página

    const username = document.getElementById('username').value.trim(); // Obtiene el nombre de usuario del formulario
    const password = document.getElementById('password').value.trim(); // Obtiene la contraseña del formulario

    // Validación de campos vacíos
    if (!username || !password) {
        document.getElementById('loginMessage').textContent = "Por favor, ingrese todos los datos."; // Muestra un mensaje si falta algún campo
        return; // Detiene la ejecución si los campos no están completos
    }

    // Guardar el nombre de usuario en el almacenamiento local para su uso posterior
    localStorage.setItem('username', username);

    // Mostrar un mensaje de éxito y redirigir al usuario a la página principal
    document.getElementById('loginMessage').textContent = "Inicio de sesión exitoso. Redirigiendo...";
    
    // Redirigir a la página principal después de 1 segundo
    setTimeout(() => {
        window.location.href = "index.html"; // Redirige a la página de inicio (puede cambiarse según sea necesario)
    }, 1000); // Retraso de 1 segundo antes de la redirección
});

// Manejo del segundo bloque del formulario de inicio de sesión (función duplicada)
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el comportamiento de envío estándar del formulario

    // Simulación de validación de autenticación (en un caso real, esto sería verificado por un backend)
    let isAuthenticated = true; // Simula si la autenticación es exitosa

    if (isAuthenticated) {
        // Si la autenticación es exitosa, redirige al usuario a la página principal
        window.location.href = 'index.html'; // Redirige a 'index.html' al usuario autenticado
    } else {
        // Si la autenticación falla, muestra un mensaje de error
        alert('Usuario o contraseña incorrectos'); // Muestra un mensaje de error si las credenciales son incorrectas
    }
});
