const FTG_SEARCH_URL = 'https://www.freetogame.com/api/games';
const HEROKU_PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

const searchGameButton = document.querySelector('.search-button');
const gameQueryText = document.querySelector('.search-bar');
const errorMessageNode = document.querySelector('.error-message');


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
  axios.get(`${HEROKU_PROXY_URL}${FTG_SEARCH_URL}`, {
    params: {
      tag: gameTag
    }
  })
  .then( res => {
    console.log(res.data);
    //generateSearchResults(res.data);
  })
  .catch( err => {
    console.log( 'Error loading search results', err );
  });
};

// const generateSearchResults = (data) => {
//   console.log(data);
// };