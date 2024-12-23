document.getElementById('songForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const artist = document.getElementById('artist').value;
    const youtubeLink = document.getElementById('youtubeLink').value;

    fetch('/api/songs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, artist, youtubeLink })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('formMessage').textContent = 'Canción agregada exitosamente.';
            document.getElementById('formMessage').style.color = 'green';
            document.getElementById('songForm').reset();
        } else {
            document.getElementById('formMessage').textContent = 'Error al agregar la canción.';
            document.getElementById('formMessage').style.color = 'red';
        }
    })
    .catch(error => {
        document.getElementById('formMessage').textContent = 'Error al conectar con el servidor.';
        document.getElementById('formMessage').style.color = 'red';
    });
});

document.getElementById('randomButton').addEventListener('click', () => {
    fetch('/api/songs/random')
        .then(response => response.json())
        .then(data => {
            displaySong(data);
        })
        .catch(error => {
            document.getElementById('songContainer').textContent = 'Error al obtener la canción aleatoria.';
        });
});

function displaySong(song) {
    document.getElementById('songContainer').innerHTML = `
        <h2>${song.title}</h2>
        <p><strong>Artista:</strong> ${song.artist}</p>
        <p><strong>URL del Video:</strong> <a href="${song.youtubeLink}" target="_blank">Ver en YouTube</a></p>
        <p><strong>Votos:</strong> <span id="votes">${song.votes}</span></p>
        <button onclick="vote('${song._id}')">Votar</button>
    `;
}

function vote(id) {
    fetch('/api/songs/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('votes').textContent = data.votes;
            } else {
                alert(data.message);
            }
        });
}
