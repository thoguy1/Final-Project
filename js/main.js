const FTG_SEARCH_URL = 'https://www.freetogame.com/api/games';

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
const loadSearchResults = async (gameTag) => {
  try {
    // Make an AJAX request to get a list of games using the user input tag
    const response = await axios.get(FTG_SEARCH_URL, {
      params: {
        tag: gameTag
      }
    });
    
    console.log(response.data);
    // Generate and handle search results using response.data
  } catch (error) {
    console.log('Error loading search results', error);
  }
};

// const generateSearchResults = (data) => {
//   console.log(data);
// };