// Se ejecuta cuando el contenido de la página ha cargado
document.addEventListener('DOMContentLoaded', () => {
    
    // Selección de los elementos del DOM que se van a utilizar
    const tweetInput = document.getElementById('tweetInput'); // Campo de texto para escribir el tweet
    const postBtn = document.getElementById('postBtn'); // Botón para publicar el tweet
    const tweetContainer = document.getElementById('tweetContainer'); // Contenedor donde se mostrarán los tweets

    // Función para obtener los tweets almacenados
    const getTweets = () => JSON.parse(localStorage.getItem('tweets')) || [];

    // Función para guardar un nuevo tweet
    const saveTweet = (tweetText) => {
        const tweets = getTweets(); // Obtener los tweets actuales
        const username = localStorage.getItem('username') || "Usuario Anónimo"; // Obtener nombre de usuario
        tweets.push({ text: tweetText, username: username }); // Agregar el nuevo tweet al arreglo
        localStorage.setItem("tweets", JSON.stringify(tweets)); // Guardar los tweets en el almacenamiento local
        loadTweets(); // Actualizar la vista de los tweets
    };

    // Función para cargar y mostrar los tweets
    const loadTweets = () => {
        const tweets = getTweets(); // Obtener los tweets actuales
        // Generar y mostrar cada tweet en el contenedor
        tweetContainer.innerHTML = tweets.map(
            (tweet, index) =>
                `<div class="tweet-item">
                    <p><strong>${tweet.username}</strong>: ${tweet.text}</p>
                    <!-- Botón para eliminar el tweet -->
                    <button class="delete-btn" onclick="deleteTweet(${index})">Eliminar</button>
                </div>`
        ).join(''); // Unir todos los tweets en un solo bloque HTML
    };

    // Función para eliminar un tweet por su índice
    window.deleteTweet = (index) => {
        const tweets = getTweets(); // Obtener los tweets actuales
        tweets.splice(index, 1); // Eliminar el tweet en el índice indicado
        localStorage.setItem("tweets", JSON.stringify(tweets)); // Guardar los tweets actualizados
        loadTweets(); // Volver a cargar la lista de tweets
    };

    // Evento para publicar un nuevo tweet
    postBtn.addEventListener('click', () => {
        const tweetText = tweetInput.value.trim(); // Obtener el texto del tweet
        if (tweetText) { // Si el tweet no está vacío
            saveTweet(tweetText); // Guardar el nuevo tweet
            tweetInput.value = ''; // Limpiar el campo de texto después de publicar
        }
    });

    loadTweets(); // Cargar los tweets al cargar la página
});

// Evento para cambiar el fondo de la barra de navegación cuando el usuario hace scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar'); // Seleccionar la barra de navegación
    if (window.scrollY > 50) { // Si el desplazamiento es mayor a 50px
        navbar.classList.add('scrolled'); // Cambiar el estilo de la barra
    } else {
        navbar.classList.remove('scrolled'); // Restaurar el estilo original si el desplazamiento es menor
    }
});
