
const FTG_SEARCH_URL1 = 'https://www.freetogame.com/api/games';
const FTG_SEARCH_URL2 = 'https://www.freetogame.com/api/filter';
const HEROKU_PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

const searchGameButton = document.querySelector('.search-button');
const gameQueryText = document.querySelector('.search-bar');
const errorMessageNode = document.querySelector('.error-message');
const searchResultsContainer = document.querySelector('.search-results');
const resultContainer = document.querySelector('.result');

const windowsLink = document.querySelector('#windows');
const browserLink = document.querySelector('#browser');
const allLink = document.querySelector('#all');

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
    const platformTag = document.createElement('p');
    platformTag.className = 'platform';
    platformTag.innerHTML = 'Platform: ' + game.platform;
    divTag.appendChild(platformTag);

    // Create the element to display game platform
    const shortDescTag = document.createElement('div');
    shortDescTag.className = 'short-description';
    shortDescTag.innerHTML = game.short_description;
    divTag.appendChild(shortDescTag);

    searchResultsContainer.appendChild(divTag);
    searchResultsContainer.style.display = 'grid';
          
    // Add a click event listener to show movie details when clicked
    // divTag.addEventListener('click', function() {
    //   errorMessageNode.innerHTML = '';
    //   searchResultsContainer.style.display = 'none';
    //   showMovieDetails(movie.id);
    // });
    
  });

};