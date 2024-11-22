// Este bloque de código se ejecuta cuando la página ha terminado de cargar
window.onload = function() {
    // Se obtiene el contenedor donde se mostrarán los tweets
    const tweetsContainer = document.getElementById('tweetsContainer');

    // Se obtiene el array de tweets guardados en el localStorage. Si no hay, se inicializa como un array vacío
    const tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    // Iteramos sobre cada tweet y lo mostramos en la página
    tweets.forEach((tweet, index) => {
        const tweetElement = createTweetElement(tweet, index); // Crear el elemento HTML para cada tweet
        tweetsContainer.appendChild(tweetElement); // Añadir el tweet al contenedor de tweets
    });
};

// Función para crear un elemento de tweet (con texto y botón de eliminar)
function createTweetElement(tweet, index) {
    // Creamos el contenedor para el tweet
    const tweetElement = document.createElement('div');
    tweetElement.classList.add('tweet-item'); // Añadimos una clase CSS para dar estilo

    // Creamos el texto del tweet con el nombre del usuario y el contenido
    const tweetText = document.createElement('p');
    tweetText.innerHTML = `<strong>${tweet.username}</strong>: ${tweet.text}`;
    tweetElement.appendChild(tweetText); // Añadimos el texto al elemento del tweet

    // Creamos el botón de eliminar con el icono de basura
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Eliminar';
    deleteButton.classList.add('delete-btn'); // Añadimos una clase para el estilo del botón
    // Al hacer clic en el botón, se llama a la función para eliminar el tweet
    deleteButton.onclick = function() {
        deleteTweet(index);
    };
    tweetElement.appendChild(deleteButton); // Añadimos el botón al elemento del tweet

    // Retornamos el elemento del tweet creado
    return tweetElement;
}

// Evento que se dispara al hacer clic en el botón de enviar tweet
document.getElementById('submitButton').addEventListener('click', function() {
    // Obtenemos el valor del campo de texto donde se escribe el tweet
    const inputField = document.getElementById('inputField');
    const tweetText = inputField.value.trim(); // Eliminamos los espacios en blanco al principio y final

    // Verificamos si el campo no está vacío
    if (tweetText) {
        // Recuperamos los tweets del localStorage, o inicializamos con un array vacío si no hay nada
        const tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        // Creamos un nuevo tweet con el texto y un nombre de usuario por defecto
        const tweet = { text: tweetText, username: "Usuario Anónimo" };

        // Añadimos el nuevo tweet al array de tweets
        tweets.push(tweet);

        // Guardamos el array de tweets actualizado en el localStorage
        localStorage.setItem('tweets', JSON.stringify(tweets));

        // Obtenemos el contenedor de tweets y añadimos el nuevo tweet
        const tweetsContainer = document.getElementById('tweetsContainer');
        tweetsContainer.appendChild(createTweetElement(tweet, tweets.length - 1)); // Añadimos el nuevo tweet al contenedor

        // Limpiamos el campo de entrada
        inputField.value = '';
    }
});

// Función para eliminar un tweet específico
function deleteTweet(index) {
    // Recuperamos el array de tweets del localStorage
    const tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    // Eliminamos el tweet en la posición indicada por el índice
    tweets.splice(index, 1);

    // Guardamos el array de tweets actualizado en el localStorage
    localStorage.setItem('tweets', JSON.stringify(tweets));

    // Limpiamos el contenedor de tweets para volver a agregar todos los tweets restantes
    const tweetsContainer = document.getElementById('tweetsContainer');
    tweetsContainer.innerHTML = ''; // Limpiamos el contenedor

    // Añadimos de nuevo los tweets restantes al contenedor
    tweets.forEach((tweet, idx) => {
        const tweetElement = createTweetElement(tweet, idx); // Creamos el elemento del tweet
        tweetsContainer.appendChild(tweetElement); // Lo añadimos al contenedor
    });
}

// Evento que se dispara al hacer scroll en la página
window.addEventListener('scroll', function() {
    // Obtenemos el elemento de la barra de navegación
    const navbar = document.querySelector('.navbar');
    
    // Si el usuario ha desplazado la página más de 50 píxeles, agregamos una clase 'scrolled' para cambiar su estilo
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled'); // Añadimos la clase 'scrolled'
    } else {
        navbar.classList.remove('scrolled'); // Si no, la quitamos
    }
});

// Este bloque se ejecuta cuando el DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtenemos el contenedor donde se mostrará el perfil del usuario
    const profileContainer = document.getElementById('profileContainer');
    
    // Recuperamos el nombre de usuario y la imagen de perfil almacenados en localStorage
    const username = localStorage.getItem('username');
    const profileImage = localStorage.getItem('profileImage') || 'perfil.png'; // Imagen por defecto si no se encuentra una

    // Si el nombre de usuario existe en localStorage, mostramos la información del perfil
    if (username) {
        const profileHTML = `
            <div class="card p-4">
                <img src="${profileImage}" alt="Profile" class="rounded-circle mb-3" width="150" height="150">
                <h2>${username}</h2>
            </div>
        `;
        profileContainer.innerHTML = profileHTML; // Insertamos el HTML generado en el contenedor
    } else {
        // Si no se ha iniciado sesión, mostramos un mensaje indicando que el usuario debe iniciar sesión
        profileContainer.innerHTML = '<p>No se ha iniciado sesión. Por favor, inicie sesión para ver el perfil.</p>';
    }
});
