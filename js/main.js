
const FTG_SEARCH_URL1 = 'https://www.freetogame.com/api/games';
const FTG_SEARCH_URL2 = 'https://www.freetogame.com/api/filter';
const HEROKU_PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

const searchGameButton = document.querySelector('.search-button');
const gameQueryText = document.querySelector('.search-bar');
const errorMessageNode = document.querySelector('.error-message');
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

windowsLink.addEventListener('click', function(ev){
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL1}`, {
    params: {
      platform: 'pc'
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
});

browserLink.addEventListener('click', function(ev){
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL1}`, {
    params: {
      platform: 'browser'
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
});

allLink.addEventListener('click', function(ev){
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL1}`, {
    params: {
      platform: 'all'
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
});

animeLink.addEventListener('click', function(ev){
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL1}`, {
    params: {
      category: 'anime'
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
});

battleRoyaleLink.addEventListener('click', function(ev){
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL1}`, {
    params: {
      category: 'battle-royale'
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
});

cardLink.addEventListener('click', function(ev){
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL1}`, {
    params: {
      category: 'card'
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
});

fantasyLink.addEventListener('click', function(ev){
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL1}`, {
    params: {
      category: 'fantasy'
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
});

fightingLink.addEventListener('click', function(ev){
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL1}`, {
    params: {
      category: 'fighting'
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
});

mmorpgLink.addEventListener('click', function(ev){
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL1}`, {
    params: {
      category: 'mmorpg'
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
});

mobaLink.addEventListener('click', function(ev){
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL1}`, {
    params: {
      category: 'moba'
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
});

racingLink.addEventListener('click', function(ev){
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL1}`, {
    params: {
      category: 'racing'
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
});

scifiLink.addEventListener('click', function(ev){
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL1}`, {
    params: {
      category: 'sci-fi'
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
});

shooterLink.addEventListener('click', function(ev){
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL1}`, {
    params: {
      category: 'shooter'
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
});

socialLink.addEventListener('click', function(ev){
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL1}`, {
    params: {
      category: 'social'
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
});

sportsLink.addEventListener('click', function(ev){
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL1}`, {
    params: {
      category: 'sports'
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
});

strategyLink.addEventListener('click', function(ev){
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL1}`, {
    params: {
      category: 'strategy'
    }
  })
  .then(res => {
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
});

searchLink.addEventListener('click', function(ev){
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL1}`, {
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
    console.log( 'Error loading search results', err );
  });
});



searchGameButton.addEventListener('click', function(ev){
  const newGameQuery = gameQueryText.value;
  
  if(newGameQuery.trim().length === 0) {
    errorMessageNode.innerHTML = 'Please enter a game name, tag, or keyword.'
    return;
  }

  loadSearchResults(newGameQuery);
});

gameQueryText.addEventListener('keydown', function(ev) {
  if (ev.key === 'Enter') {
    const newGameQuery = gameQueryText.value;
    
    if (newGameQuery.trim().length === 0) {
      errorMessageNode.innerHTML = 'Please enter a game name, tag, or keyword.';
      return;
    }
    
    loadSearchResults(newGameQuery);
  }
});

// When user start typing on the input field, the previous error message disappear
gameQueryText.addEventListener('input', function(ev){
  if(ev.target.value.trim().length > 0){
    errorMessageNode.innerHTML = '';
  }
});

// Load the search results from the input text entered by user
const loadSearchResults = (gameTag) => {
  // Make an AJAX request to get a list movies from the user input text
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL2}`, {
    params: {
      tag: gameTag
    }
  })
  .then( res => {
    console.log(res.data);
    generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
};

// Generate game search results
const generateSearchResults = (games) => {
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
          
    //Add a click event listener to show game details when clicked
    divTag.addEventListener('click', function() {
      searchResultsContainer.style.display = 'none';
      searchGameDetails(game.id);
    });
  });
}; // generateSearchResults()

const searchGameDetails = (gameId) => {

  axios.get(`${HEROKU_PROXY_URL}https://www.freetogame.com/api/game`, {
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
}; // searchGameDetails()

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
}; // generateGameDetails

const generateSpecsTable = (game) => {
  const tableSpecs = `
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
        <th>Operating System:</th>
        <td colspan="4">${game.minimum_system_requirements.os}</td>
      </tr>
      <tr>
        <th>Processor:</th>
        <td colspan="4">${game.minimum_system_requirements.processor}</td>
      </tr>
      <tr>
        <th>Memory:</th>
        <td colspan="4">${game.minimum_system_requirements.memory}</td>
      </tr>
      <tr>
        <th>Graphics card:</th>
        <td colspan="4">${game.minimum_system_requirements.graphhics}</td>
      </tr>
      <tr>
        <th>Storage:</th>
        <td colspan="4">${game.minimum_system_requirements.storage}</td>
      </tr>
    </table>
  `;

  return tableSpecs;
}