
const FTG_SEARCH_URL1 = 'https://www.freetogame.com/api/games';
const FTG_SEARCH_URL2 = 'https://www.freetogame.com/api/filter';

const searchGameButton = document.querySelector('.search-button');
const gameQueryText = document.querySelector('.search-bar');
const errorMessageNode = document.querySelector('.error-message');
const showFavouritesButton = document.querySelector('.favourites-button');
const favouriteCounter = document.querySelector('.favourite-counter');

const searchResultsContainer = document.querySelector('.search-results');
const resultContainer = document.querySelector('.result');
const gameDetailsContainer = document.querySelector('.game-details');

const windowsLink = document.querySelector('#windows');
const browserLink = document.querySelector('#browser');
const allLink = document.querySelector('#all');

const animeLink = document.querySelector('#anime');
const battleRoyaleLink = document.querySelector('#battle-royale');
const cardLink = document.querySelector('#card');
const fantasyLink = document.querySelector('#fantasy');
const fightingLink = document.querySelector('#fighting');
const mmorpgLink = document.querySelector('#mmorpg');
const mobaLink = document.querySelector('#moba');
const racingLink = document.querySelector('#racing');
const scifiLink = document.querySelector('#sci-fi');
const shooterLink = document.querySelector('#shooter');
const socialLink = document.querySelector('#social');
const sportsLink = document.querySelector('#sports');
const strategyLink = document.querySelector('#strategy');

const platformSelect = document.querySelector('#platform-select');
const genreSelect = document.querySelector('#genre-select');
const sortBySelect = document.querySelector('#sort-by-select');
const searchLink = document.querySelector('.search-link');

let favouriteGamesIDs = [];

// Function to show favourite counter
const showFavouritesCounter = () => {
  if (favouriteGamesIDs.length > 0) {
    favouriteCounter.innerHTML = favouriteGamesIDs.length;
  } else {
    favouriteCounter.innerHTML = '';
  }
}

// Retrieve favourite movies from localStorage
const savedGamesIDs = JSON.parse(localStorage.getItem('favourite-games'));
if(Array.isArray(savedGamesIDs)) {
  favouriteGamesIDs = savedGamesIDs;
  showFavouritesCounter();
}

// Function to show user favourite games
const showFavourites = () => {
  if(favouriteGamesIDs.length > 0) {
    // Clear previous search results
    searchResultsContainer.replaceChildren();
    // Make sure gameDetailsContainer and castDetailsContainer are hidden
    gameDetailsContainer.style.display = 'none';
    favouriteGamesIDs.forEach(gameId => {
      axios.get('https://www.freetogame.com/api/game', {
        params: {
          id: gameId
        }
      })
      .then(res => {
        generateFavouriteGame(res.data);
      })
      .catch( err => {
        console.log( 'Error loading game details', err );
      });
      
    });
    searchResultsContainer.style.display = 'grid';
  } else {
    searchResultsContainer.replaceChildren();
    gameDetailsContainer.style.display = 'none';
    errorMessageNode.innerHTML = 'There is no favourite game saved';
  }
};

// Function to generate and display favorite game results
const generateFavouriteGame = (game) => {
  const divTag = document.createElement('div');
  divTag.className = 'favourite-result';
  // Create thumbnail container
  const thumbnailTag = document.createElement('div');
  thumbnailTag.className = 'thumbnail-container'
  // Create the image element for game thumbnail
  const imgTag = document.createElement('img');
  imgTag.className = 'thumbnail';
  imgTag.src = `https://www.freetogame.com/g/${game.id}/thumbnail.jpg`;
  imgTag.alt = game.title;
  thumbnailTag.appendChild(imgTag);

  const removeButton = document.createElement('button');
  removeButton.className = 'remove-button'
  removeButton.innerHTML = 'X';
  removeButton.alt = `remove ${game.title}`;
  thumbnailTag.appendChild(removeButton);
  divTag.appendChild(thumbnailTag);

  // Create the element to display game title
  const titleTag = document.createElement('h3');
  titleTag.innerHTML = game.title;
  divTag.appendChild(titleTag);

  // Create the element to display game platform
  const platformTag = document.createElement('div');
  platformTag.className = 'platform';
  platformTag.innerHTML = 'Platform: ' + game.platform;
  divTag.appendChild(platformTag);

  // Create the element to display release date
  const releaseDateTag = document.createElement('div');
  releaseDateTag.className = 'release-date';
  releaseDateTag.innerHTML = 'Release Date: ' + game.release_date;
  divTag.appendChild(releaseDateTag);

  // Create the element to display short description of the game
  const shortDescTag = document.createElement('div');
  shortDescTag.className = 'short-description';
  shortDescTag.innerHTML = game.short_description;
  divTag.appendChild(shortDescTag);

  searchResultsContainer.appendChild(divTag);
  searchResultsContainer.style.display = 'grid';
        
  //Add a click event listener to show game details when clicked
  imgTag.addEventListener('click', function() {
    searchResultsContainer.style.display = 'none';
    searchGameDetails(game.id);
  });

  // Add a click event listener to remove a favourite game
  removeButton.addEventListener('click', function() {
    // Remove the game from the favorites list
    const index = favouriteGamesIDs.indexOf(game.id);
    if (index !== -1) {
      favouriteGamesIDs.splice(index, 1);
      showFavouritesCounter();
      saveGamesToLocalStorage();
      showFavourites();
    }
  });
};

// Show error message when Tag is not found
const showErrorMessage = () => {
  errorMessageNode.innerHTML = `<p>Please enter a game tag.</p>
  <div class="tag-list">
  <div><strong>Tag List:</strong></div>
  <div>mmorpg, shooter, strategy, moba, racing, sports, social, sandbox, open-world, survival, pvp, pve, pixel, voxel, zombie, turn-based, first-person, third-Person, top-down, tank, space, sailing, side-scroller, superhero, permadeath, card, battle-royale, mmo, mmofps, mmotps, 3d, 2d, anime, fantasy, sci-fi, fighting, action-rpg, action, military, martial-arts, flight, low-spec, tower-defense, horror, mmorts </div>
  </div>`;
};

// When user start typing on the input field, the previous error message disappear
gameQueryText.addEventListener('input', function(ev){
  if(ev.target.value.trim().length > 0){
    errorMessageNode.innerHTML = '';
  }
});

// Function to load search results from the input text entered by user
const loadSearchResults = (gameTag) => {
  // Make an AJAX request to get a list games from the user input text
  axios.get(`${FTG_SEARCH_URL2}`, {
    params: {
      tag: gameTag
    }
  })
  .then( res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    searchResultsContainer.replaceChildren();
    showErrorMessage();
  });
};

// Function to generate game search results
const generateSearchResults = (games) => {
  errorMessageNode.innerHTML = '';
  // Clear previous search results
  searchResultsContainer.replaceChildren();

  // Loop over each game result
  games.forEach( game => {
    const divTag = document.createElement('div');
    divTag.className = 'result';
    // Create the image element for game thumbnail
    const imgTag = document.createElement('img');
    imgTag.className = "game-thumbnail";
    imgTag.src = `https://www.freetogame.com/g/${game.id}/thumbnail.jpg`;
    imgTag.alt = game.title;
    divTag.appendChild(imgTag);

    // Create the element to display game title
    const titleTag = document.createElement('h3');
    titleTag.innerHTML = game.title;
    divTag.appendChild(titleTag);

    // Create the element to display game platform
    const platformTag = document.createElement('div');
    platformTag.className = 'platform';
    platformTag.innerHTML = 'Platform: ' + game.platform;
    divTag.appendChild(platformTag);

    // Create the element to display release date
    const releaseDateTag = document.createElement('div');
    releaseDateTag.className = 'release-date';
    releaseDateTag.innerHTML = 'Release Date: ' + game.release_date;
    divTag.appendChild(releaseDateTag);

    // Create the element to display short description of the game
    const shortDescTag = document.createElement('div');
    shortDescTag.className = 'short-description';
    shortDescTag.innerHTML = game.short_description;
    divTag.appendChild(shortDescTag);

    searchResultsContainer.appendChild(divTag);
    searchResultsContainer.style.display = 'grid';
          
    // Add a click event listener to show game details when clicked
    divTag.addEventListener('click', function() {
      searchResultsContainer.style.display = 'none';
      searchGameDetails(game.id);
    });
  });
};

// Function to search for game details
const searchGameDetails = (gameId) => {

  axios.get('https://www.freetogame.com/api/game', {
    params: {
      id: gameId
    }
  })
  .then(res => {
    generateGameDetails(res.data);
  })
  .catch( err => {
    console.log( 'Error loading game details', err );
  });
};

// Function to show game details
const generateGameDetails = (game) => {
  gameDetailsContainer.replaceChildren();

  const gameTitle = document.createElement('h2');
  gameTitle.innerHTML = game.title;

  gameDetailsContainer.appendChild(gameTitle);

  const screenshotsContainer = document.createElement('div');
  screenshotsContainer.className = 'screenshots';
  screenshotsContainer.style.display = 'grid';
  // Create screenshots of the game
  game.screenshots.forEach(screenshot => {
    const divTag = document.createElement('div');
    divTag.className = 'screenshot'
    const imgTag = document.createElement('img');
    imgTag.src = screenshot.image;
    imgTag.alt = game.title;
    divTag.appendChild(imgTag);

    screenshotsContainer.appendChild(divTag); 
  });

  gameDetailsContainer.appendChild(screenshotsContainer);

  const specsDiv = document.createElement('div');
  specsDiv.className = 'specs-table';
  specsDiv.innerHTML = generateSpecsTable(game);
  gameDetailsContainer.appendChild(specsDiv);

  const descHeader = document.createElement('div');
  descHeader.className = 'description-header';
  descHeader.innerHTML = 'Description:'
  gameDetailsContainer.appendChild(descHeader);

  const descDiv = document.createElement('div');
  descDiv.className = 'description';
  descDiv.innerHTML = game.description;
  gameDetailsContainer.appendChild(descDiv);

  generateButtons(game);
  gameDetailsContainer.style.display = 'block';
};

// Function to generate game specs table
const generateSpecsTable = (game) => {
  let processor = '';
  let memory = '';
  let graphics = '';
  let storage = '';

  if(game.minimum_system_requirements) {
    const requirements = game.minimum_system_requirements;

    if (requirements.processor !== null && requirements.processor !== undefined) {
      processor = requirements.processor;
    }
    if (requirements.memory !== null && requirements.memory !== undefined) {
      memory = requirements.memory;
    }
    if (requirements.graphics !== null && requirements.graphics !== undefined) {
      graphics = requirements.graphics;
    }
    if (requirements.storage !== null && requirements.storage !== undefined) {
      storage = requirements.storage;
    }
  }
  
  // Create table for game specs and store in a variable
  const specsTable = `
    <table>
      <tr>
        <th>Genre</th>
        <th>Platform</th>
        <th>Publisher</th>
        <th>Developer</th>
        <th>Release Date</th>
      </tr>
      <tr>
        <td>${game.genre}</td>
        <td>${game.platform}</td>
        <td>${game.publisher}</td>
        <td>${game.developer}</td>
        <td>${game.release_date}</td>
      </tr>
      <tr style="text-align: center;">
        <th colspan="5">Minimum System Requirements</th>
      </tr>
      <tr>
        <th>Processor:</th>
        <td colspan="4">${processor}</td>
      </tr>
      <tr>
        <th>Memory:</th>
        <td colspan="4">${memory}</td>
      </tr>
      <tr>
        <th>Graphics card:</th>
        <td colspan="4">${graphics}</td>
      </tr>
      <tr>
        <th>Storage:</th>
        <td colspan="4">${storage}</td>
      </tr>
    </table>
  `;

  return specsTable;
}

// Function to generate 'Play game', 'Add/Remove Favourite', and 'Back to Search Results' buttons
const generateButtons = (game) => {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'buttons-container';
  const isFavourite = favouriteGamesIDs.includes(game.id);
  
  const playButton = document.createElement('button');
  playButton.className = 'play-button';
  playButton.innerHTML = 'Play Game';
  buttonsContainer.appendChild(playButton);

  const favouriteButton = document.createElement('button');
  favouriteButton.className = 'favourite-button';
  favouriteButton.innerHTML = isFavourite ? 'Remove from Favourite' : 'Add to Favourite';
  buttonsContainer.appendChild(favouriteButton);

  const backButton = document.createElement('button');
  backButton.className = 'back-button';
  backButton.innerHTML = 'Back to Search Results';
  buttonsContainer.appendChild(backButton);

  gameDetailsContainer.appendChild(buttonsContainer);

  handlePlayButton(playButton, game.game_url);

  handleBackButton(backButton);
  
  handleFavouriteButton(favouriteButton, game.id, isFavourite);
};

// Function to return to search results
const handleBackButton = (backButton) => {
  backButton.addEventListener('click', () => {
    gameDetailsContainer.style.display = 'none';
    searchResultsContainer.style.display = 'grid';
  });
};

// Function to handle favourite button click
const handleFavouriteButton = (favouriteButton, id, isFavourite) => {
  
  favouriteButton.addEventListener('click', (ev) => {
    ev.preventDefault();
    if (isFavourite) {
      // Remove the game from the favorites list
      const index = favouriteGamesIDs.indexOf(id);
      if (index !== -1) {
        favouriteGamesIDs.splice(index, 1);
        showFavouritesCounter();
        saveGamesToLocalStorage();
        isFavourite = false;
      }
    } else {
      // Add the game to the favorites list
      favouriteGamesIDs.push(id);
      favouriteCounter.innerHTML = favouriteGamesIDs.length;
      saveGamesToLocalStorage();
      isFavourite = true;
    }
    // Toggle the button text
    favouriteButton.innerHTML = isFavourite ? 'Remove from Favourite' : 'Add to Favourite';
  });
};

// Function to open the official game URL in a new tab
const handlePlayButton = (playButton, url) => {
  playButton.addEventListener('click', () => {
    window.open(url, '_blank');
  });
};

// Function to save favourite games to local storage with 'favourites' as key name
const saveGamesToLocalStorage = function(){
  localStorage.setItem('favourite-games', JSON.stringify(favouriteGamesIDs));
};

// Function to search by platform
const searchByPlatform = (p) => {
  axios.get(`${FTG_SEARCH_URL1}`, {
    params: {
      platform: p
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
};

// Function to search by genre
const searchByGenre = (genre) => {
  axios.get(`${FTG_SEARCH_URL1}`, {
    params: {
      category: genre
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
};

// When user clicks 'Windows (PC)' link on the sidebar
windowsLink.addEventListener('click', function(ev){
  searchByPlatform('pc');
});

// When user clicks 'Browser (Web)' link on the sidebar
browserLink.addEventListener('click', function(ev){
  searchByPlatform('browser');
});

// When user clicks 'All platforms' link on the sidebar
allLink.addEventListener('click', function(ev){
  searchByPlatform('all');
});

// When user clicks 'Anime' genre link on the sidebar
animeLink.addEventListener('click', function(ev){
  searchByGenre('anime');
});

// When user clicks 'Battle Royale' genre link on the sidebar
battleRoyaleLink.addEventListener('click', function(ev){
  searchByGenre('battle-royale');
});

// When user clicks 'Card Games' link on the sidebar
cardLink.addEventListener('click', function(ev){
  searchByGenre('card');
});

// When user clicks 'Fantasy' genre link on the sidebar
fantasyLink.addEventListener('click', function(ev){
  searchByGenre('fantasy');
});

// When user clicks 'Fighting' genre link on the sidebar
fightingLink.addEventListener('click', function(ev){
  searchByGenre('fighting');
});

// When user clicks 'MMORPG' genre link on the sidebar
mmorpgLink.addEventListener('click', function(ev){
  searchByGenre('mmorpg');
});

// When user clicks 'MOBA' genre link on the sidebar
mobaLink.addEventListener('click', function(ev){
  searchByGenre('moba');
});

// When user clicks 'Racing' genre link on the sidebar
racingLink.addEventListener('click', function(ev){
  searchByGenre('racing');
});

// When user clicks 'Sci-fi' genre link on the sidebar
scifiLink.addEventListener('click', function(ev){
  searchByGenre('sci-fi');
});

// When user clicks 'Shooter' genre link on the sidebar
shooterLink.addEventListener('click', function(ev){
  searchByGenre('shooter');
});

// When user clicks 'Social' genre link on the sidebar
socialLink.addEventListener('click', function(ev){
  searchByGenre('social');
});

// When user clicks 'Sports' genre link on the sidebar
sportsLink.addEventListener('click', function(ev){
  searchByGenre('sports');
});

// When user clicks 'Strategy' genre link on the sidebar
strategyLink.addEventListener('click', function(ev){
  searchByGenre('strategy');
});

// When user clicks 'Search' link on the bottom of sidebar
searchLink.addEventListener('click', function(ev){
  axios.get(`${FTG_SEARCH_URL1}`, {
    params: {
      platform: platformSelect.value,
      category: genreSelect.value,
      'sort-by': sortBySelect.value
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    searchResultsContainer.replaceChildren();
    errorMessageNode.innerHTML = 'Game not found!';
  });
});

// When user clicks the search game icon
searchGameButton.addEventListener('click', function(ev){
  const newGameQuery = gameQueryText.value;
  
  if(newGameQuery.trim().length === 0) {
    showErrorMessage();
    return;
  }

  loadSearchResults(newGameQuery);
});

// When user presses the 'Enter' key from the text field
gameQueryText.addEventListener('keydown', function(ev) {
  if (ev.key === 'Enter') {
    const newGameQuery = gameQueryText.value;
    
    if (newGameQuery.trim().length === 0) {
      showErrorMessage();
      return;
    }
    
    loadSearchResults(newGameQuery);
  }
});

// When user clicks 'Favourites' button
showFavouritesButton.addEventListener('click', () => {
  showFavourites();
});
