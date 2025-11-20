(function() {
    let games = []; // This will hold the fetched game data

    // Fetch game data from games.json
    fetch('games.json')
        .then(response => response.json())
        .then(data => {
            games = data;
            renderGames(games); // Initial render after data is loaded
        })
        .catch(error => console.error('Error fetching game data:', error));

    function renderGames(gamesToRender) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        gamesToRender.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.innerHTML = `
                <h3>${game.name}</h3>
                <p>${game.description}</p>
                <p class="players">Players: ${game.minPlayers} - ${game.maxPlayers}</p>
                <div class="location-button">
                    <p class="location">Location: ${game.location.charAt(0).toUpperCase() + game.location.slice(1)}</p>
                    <button onclick="openModal('${game.name}')">How to Play</button>
                </div>
            `;
            resultsDiv.appendChild(gameCard);
        });
    }

    function filterGames() {
        const location = document.getElementById('location').value;
        const playersInput = document.getElementById('min-players').value;
        const players = playersInput ? parseInt(playersInput) : null;

        const filteredGames = games.filter(game => {
            const locationMatch = !location || game.location === location;
            const playersMatch = players === null || (game.minPlayers <= players && game.maxPlayers >= players);
            return locationMatch && playersMatch;
        });

        renderGames(filteredGames);
    }

    // Add real-time filtering on input changes
    document.getElementById('location').addEventListener('change', filterGames);
    document.getElementById('min-players').addEventListener('input', filterGames);

    // Modal functions
    function openModal(gameName) {
        const game = games.find(g => g.name === gameName);
        if (game) {
            document.getElementById('modal-title').textContent = game.name;
            document.getElementById('modal-description').textContent = game.description;
            document.getElementById('modal-players').textContent = `Players: ${game.minPlayers} - ${game.maxPlayers}`;
            document.getElementById('modal-location').textContent = `Location: ${game.location.charAt(0).toUpperCase() + game.location.slice(1)}`;
            document.getElementById('modal-instructions').textContent = game.instructions;
            const gallery = document.getElementById('modal-images');
            gallery.innerHTML = '';
            if (game.images && game.images.length > 0) {
                game.images.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = game.name;
                    gallery.appendChild(img);
                });
            }
            const modal = document.getElementById('modal');
            modal.style.display = 'block';
            document.body.classList.add('modal-open');
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }
    }

    function closeModal() {
        const modal = document.getElementById('modal');
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Close modal when clicking outside or on close button
    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target === document.getElementById('modal')) {
            closeModal();
        }
    });

    // Admin panel toggle
    document.getElementById('toggle-admin').addEventListener('click', function() {
        const panel = document.getElementById('admin-panel');
        panel.style.display = panel.style.display === 'none' || panel.style.display === '' ? 'block' : 'none';
    });

    // Add new game
    document.getElementById('add-game-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const imagesInput = document.getElementById('new-images').value;
        const images = imagesInput ? imagesInput.split(',').map(url => url.trim()) : [];
        const newGame = {
            name: document.getElementById('new-name').value,
            description: document.getElementById('new-description').value,
            minPlayers: parseInt(document.getElementById('new-min-players').value),
            maxPlayers: parseInt(document.getElementById('new-max-players').value),
            location: document.getElementById('new-location').value,
            instructions: document.getElementById('new-instructions').value,
            images: images
        };
        games.push(newGame); // Add to the 'games' array
        renderGames(games); // Re-render all games including the new one
        // Reset form
        e.target.reset();
        // Hide admin panel
        document.getElementById('admin-panel').style.display = 'none';
    });

    // Initial render is now handled after fetching data
})();
