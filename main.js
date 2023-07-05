/*----- constants -----*/
const winAudio = new Audio('https://www.barbneal.com/wp-content/uploads/marvin13.mp3');
const loseAudio = new Audio('https://www.barbneal.com/wp-content/uploads/marvin11.mp3');
const CATEGORIES = {
  Animals: ['dog', 'cat', 'bird', 'fish', 'bugs'],
  Food: ['fruit', 'vegetable', 'meat', 'candy', 'bread'],
  Places: ['Bolivia', 'Canada', 'Philippines', 'France', 'Egypt']
};
const SPACE_MAN = {
  one: { img: 'imgs/1.jpg' },
  two: { img: 'imgs/2.jpg' },
  three: { img: 'imgs/3.jpg' },
  four: { img: 'imgs/4.jpg' },
  five: { img: 'imgs/5.jpg' },
  six: { img: 'imgs/6.jpg' },
  seven: { img: 'imgs/7.jpg' },
  eight: { img: 'imgs/8.jpg' },
  nine: { img: 'imgs/9.jpg' }
};

/*----- app's state (variables) -----*/
let selectedCategory;
let selectedWord;
let guessedLetters;
let incorrectGuesses;
let maxIncorrectGuesses = 9;

/*----- cached element references -----*/
const categoryButtons = document.querySelectorAll('nav button');
const holdElement = document.getElementById('hold');
const livesElement = document.getElementById('lives'); // Updated ID here
const clueElement = document.getElementById('clue');
const hintButton = document.getElementById('hint');
const resetButton = document.getElementById('reset');
const resultMessageElement = document.getElementById('result-message');

/*----- event listeners -----*/
categoryButtons.forEach(button => {
  button.addEventListener('click', handleCategorySelection);
});
button.addEventListener('click', () => handleLetterGuess(letter));
hintButton.addEventListener('click', handleHint);
resetButton.addEventListener('click', resetGame);

/*----- functions -----*/
init();

function init() {
  selectedCategory = null;
  selectedWord = null;
  guessedLetters = [];
  incorrectGuesses = 0;
  alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  render();
}

function handleCategorySelection(event) {
  selectedCategory = event.target.textContent;
  selectedWord = getRandomWordFromCategory(selectedCategory);
  guessedLetters = Array(selectedWord.length).fill('');
  incorrectGuesses = 0;

  render();
}

function handleLetterGuess(letter) {
    const pressedKey = letter.toLowerCase();
    if (alphabet.includes(pressedKey)) {
      const letterIndex = selectedWord.toLowerCase().indexOf(pressedKey);
  
      if (letterIndex === -1) {
        incorrectGuesses++;
      } else {
        updateGuessedLetters(letterIndex, pressedKey);
      }
  
      render();
    }
  }


function handleHint() {
  const hints = {
    Animals: ["Man's best friend", "Felines", "Feathered creature", "tuna is a type of", "insects are generalized as"],
    Food: ["Sweet and juicy", "Good for your health", "Protein source", "Sugary treats", "carbs on carbs"],
    Places: ["South American country", "North of USA", "multi-islanded country in Asia", "country where the city of love is", "Pyramids are found here"]
  };

  const hintIndex = CATEGORIES[selectedCategory].indexOf(selectedWord);
  const hint = hints[selectedCategory][hintIndex];

  clueElement.textContent = `Clue: ${hint}`;
}
function resetGame() {
    selectedCategory = null;
    selectedWord = null;
    guessedLetters = [];
    incorrectGuesses = 0;
  
    render();
  }
  
  function getRandomWordFromCategory(category) {
    const words = CATEGORIES[category];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }
  
  function updateGuessedLetters(letterIndex, letter) {
    guessedLetters[letterIndex] = letter.toLowerCase();
  }
  
  function isLetterGuessed(letter) {
    return guessedLetters.includes(letter.toLowerCase());
  }
  
  function isWordGuessed() {
    return guessedLetters.join('').toLowerCase() === selectedWord.toLowerCase();
  }
  
  function isGameOver() {
    return incorrectGuesses >= maxIncorrectGuesses;
  }
  
  function render() {
    renderCategoryName();
    renderButtons();
    renderWordDisplay();
    renderLives();
    renderSpacemanImage(getSpacemanPiece());
    renderClue();
    renderResultMessage();
  }
  
  function renderCategoryName() {
    const categoryNameElement = document.getElementById('categoryName');
    categoryNameElement.textContent = selectedCategory ? `Category: ${selectedCategory}` : '';
  }
  
  function renderButtons() {
    const buttonsElement = document.getElementById('buttons');
    buttonsElement.innerHTML = '';
  
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alphabet.forEach(letter => {
      const button = document.createElement('button');
      button.textContent = letter;
      button.disabled = isLetterGuessed(letter) || isGameOver();
      buttonsElement.appendChild(button);
    });
  }
  
  function renderWordDisplay() {
    const guessedLettersText = guessedLetters.join(' ');
    wordDisplayElement.textContent = `Word: ${guessedLettersText}`;
  }
  
  function renderLives() {
    const remainingLives = maxIncorrectGuesses - incorrectGuesses;
    livesElement.textContent = `Lives: ${remainingLives}/${maxIncorrectGuesses}`;
  }
  
  function getSpacemanPiece() {
    return `piece${incorrectGuesses + 1}`;
  }
  
  function renderSpacemanImage(piece) {
    spacemanImageElement.src = SPACE_MAN[piece].img;
  }
  
  function renderClue() {
    clueElement.textContent = `Clue: ${selectedWord.length} letters`;
  }
  
  function renderResultMessage() {
    resultMessageElement.textContent = '';
  }
  
  function renderResult(won) {
    const resultMessage = won ? 'You did it!' : 'Game over!';
    resultMessageElement.textContent = resultMessage;
  }
  
  render();