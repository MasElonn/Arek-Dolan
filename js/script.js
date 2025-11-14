const games = [
    {
        name: "Congklak",
        description: "A traditional board game played with small stones or shells in holes on a wooden board.",
        minPlayers: 2,
        maxPlayers: 2,
        location: "indoor",
        instructions: "Players take turns moving stones around the board, capturing opponent's stones by landing on occupied holes. The player with the most stones wins.",
        images: ["images/download (5).jpg", "images/download (5).jpg", "images/download (5).jpg"]
    },
    {
        name: "Gobak Sodor",
        description: "A game where players kick a ball made from woven rattan into the opponent's goal.",
        minPlayers: 4,
        maxPlayers: 10,
        location: "outdoor",   
        instructions: "Divide into two teams. Kick the ball into the opponent's goal without using hands. First team to score wins.",
        images: ["images/download (5).jpg", "images/download (5).jpg"]
    },
    {
        name: "Egrang",
        description: "A game similar to hopscotch, played on a drawn grid on the ground.",
        minPlayers: 1,
        maxPlayers: 4,
        location: "outdoor",
        instructions: "Draw a grid on the ground. Hop through the squares on one foot, picking up stones without stepping on lines.",
        images: ["images/download (5).jpg", "images/download (5).jpg", "images/download (5).jpg"]
    },
    {
        name: "Dakon",
        description: "A variant of Congklak, played with larger boards and more holes.",
        minPlayers: 2,
        maxPlayers: 2,
        location: "indoor",
        instructions: "Similar to Congklak but with more holes. Move seeds around the board, capturing when landing on opponent's side.",
        images: ["images/download (5).jpg", "images/download (5).jpg"]
    },
    {
        name: "Kelereng",
        description: "A marble game where players shoot marbles into holes or at each other's marbles.",
        minPlayers: 2,
        maxPlayers: 6,
        location: "outdoor",
        instructions: "Draw a circle or holes in the ground. Take turns shooting marbles to knock others out or into holes.",
        images: ["images/download (5).jpg", "images/download (5).jpg", "images/download (5).jpg"]
    },
    {
        name: "Bentengan",
        description: "A team-based game where players defend a fort made of stacked stones or wood.",
        minPlayers: 6,
        maxPlayers: 20,
        location: "outdoor",
        instructions: "Build forts with stones. Teams try to knock down the opponent's fort while defending their own.",
        images: ["images/download (5).jpg", "images/download (5).jpg"]
    },
    {
        name: "Ular Naga",
        description: "A dragon dance game where players form a long line and mimic a dragon's movements.",
        minPlayers: 10,
        maxPlayers: 50,
        location: "outdoor",
        instructions: "Form a long line holding hands. The leader mimics dragon movements, others follow in sync.",
        images: ["images/download (5).jpg", "images/download (5).jpg", "images/download (5).jpg"]
    },
    {
        name: "Layangan",
        description: "Kite flying, a popular outdoor activity with traditional kite designs.",
        minPlayers: 1,
        maxPlayers: 5,
        location: "outdoor",
        instructions: "Build or buy a kite. Fly it in open areas, competing for height or tricks.",
        images: ["images/download (5).jpg", "images/download (5).jpg"]
    }
];

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
    games.push(newGame);
    renderGames(games);
    // Reset form
    e.target.reset();
    // Hide admin panel
    document.getElementById('admin-panel').style.display = 'none';
});

// Initial render
renderGames(games);
