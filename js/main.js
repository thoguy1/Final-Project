
const FTG_SEARCH_URL1 = 'https://www.freetogame.com/api/games';
const FTG_SEARCH_URL2 = 'https://www.freetogame.com/api/filter';
const HEROKU_PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

const searchGameButton = document.querySelector('.search-button');
const gameQueryText = document.querySelector('.search-bar');
const errorMessageNode = document.querySelector('.error-message');
const searchResultsContainer = document.querySelector('.search-results');
const resultContainer = document.querySelector('.result');


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
    // Create the image element for the movie poster
    const imgTag = document.createElement('img');
    imgTag.className = "game-thumbnail";
    imgTag.src = `https://www.freetogame.com/g/${game.id}/thumbnail.jpg`;
    imgTag.alt = game.title;
    divTag.appendChild(imgTag);

    // Create the element to display game title
    const titleTag = document.createElement('h3');
    titleTag.innerHTML = game.title;
    divTag.appendChild(titleTag);
    
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