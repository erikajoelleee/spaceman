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
const maxIncorrectGuesses = 9; // Maximum incorrect guesses allowed

/*----- cached element references -----*/
const categoryButtons = document.querySelectorAll('nav button');
const buttonsContainer = document.getElementById('buttons');
const guessedLettersElement = document.getElementById('guessed-letters');
const livesElement = document.getElementById('mylives');
const spacemanImageElement = document.getElementById('spaceman-image');
const clueElement = document.getElementById('clue');
const hintButton = document.getElementById('hint');
const resetButton = document.getElementById('reset');
const resultMessageElement = document.getElementById('result-message');

/*----- event listeners -----*/
categoryButtons.forEach(button => {
  button.addEventListener('click', handleCategorySelection);
});
buttonsContainer.addEventListener('click', handleLetterClick);
window.addEventListener('keydown', handleLetterPress);
hintButton.addEventListener('click', handleHint);
resetButton.addEventListener('click', resetGame);

/*----- functions -----*/
init();

function init() {
  selectedCategory = null;
  selectedWord = null;
  guessedLetters = [];
  incorrectGuesses = 0;

  render();
}

function handleCategorySelection(event) {
  selectedCategory = event.target.textContent;
  selectedWord = getRandomWordFromCategory(selectedCategory);
  guessedLetters = Array(selectedWord.length).fill('');

  // Reset incorrectGuesses
  incorrectGuesses = 0;

  render();
}

function handleLetterClick(event) {
  const pressedLetter = event.target.textContent.toLowerCase();
  event.target.disabled = true; // Disable the clicked button
  processGuess(pressedLetter);
}

function handleLetterPress(event) {
  const pressedLetter = event.key.toLowerCase();
  if ('abcdefghijklmnopqrstuvwxyz'.includes(pressedLetter) && !guessedLetters.includes(pressedLetter)) {
    const button = document.querySelector(`#buttons button[data-letter="${pressedLetter}"]`);
    if (button) {
      button.disabled = true; // Disable the corresponding button
    }
    processGuess(pressedLetter);
  }
}

function processGuess(letter) {
  if (!selectedWord || guessedLetters.includes(letter)) {
    return;
  }

  guessedLetters.push(letter);

  if (selectedWord.includes(letter)) {
    updateHiddenWord();
  } else {
    incorrectGuesses++;
    renderSpaceman();
    updateLives();
  }

  updateGuessedLetters

    function updateHiddenWord() {
        const wordDisplay = selectedWord
          .split('')
          .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
          .join(' ');
        document.getElementById('word-display').textContent = wordDisplay;
      }
      
      function updateGuessedLetters() {
        guessedLettersElement.textContent = `Guessed Letters: ${guessedLetters.join(' ')}`;
      }
      
      function updateLives() {
        livesElement.textContent = `Lives: ${maxIncorrectGuesses - incorrectGuesses}`;
      }
      
      function getRandomWordFromCategory(category) {
        const words = CATEGORIES[category];
        return words[Math.floor(Math.random() * words.length)];
      }
      
      function renderSpaceman() {
        spacemanImageElement.src = SPACE_MAN[incorrectGuesses.toString()].img;
      }
      
      function checkGameStatus() {
        const isWordGuessed =
          guessedLetters.length === selectedWord.length &&
          guessedLetters.every((letter, index) => letter === selectedWord[index]);
      
        if (isWordGuessed) {
          endGame(true);
        } else if (incorrectGuesses === maxIncorrectGuesses) {
          endGame(false);
        }
      }
      
      function endGame(isWon) {
        if (isWon) {
          resultMessageElement.textContent = 'You did it!';
          winAudio.play(); // Play win sound
        } else {
          resultMessageElement.textContent = `Oops! Game over. The word was "${selectedWord}".`;
          loseAudio.play(); // Play lose sound
        }
      
        // Disable letter buttons
        buttonsContainer.removeEventListener('click', handleLetterClick);
        window.removeEventListener('keydown', handleLetterPress);
      
        // Disable hint button
        hintButton.disabled = true;
      }
      
      function handleHint() {
        clueElement.textContent = `Hint: ${getHint(selectedWord)}`;
        hintButton.disabled = true;
        document.getElementById('word-display').style.display = 'none';
      }
      
      function getHint(word) {
        const hints = {
          dog: "Man's best friend",
          cat: 'felines',
          bird: 'Flies in the sky',
          fish: 'Lives underwater',
          bugs: 'Insects',
          fruit: 'Healthy snacks',
          vegetable: 'Leafy greens',
          meat: 'Protein source',
          candy: 'Sweet treats',
          bread: 'Carbs on carbs',
          Bolivia: 'South American country',
          Canada: 'Country above USA',
          Philippines: 'Multi-island country in Asia',
          France: 'Eiffel tower is found in this country',
          Egypt: 'Home of the pyramids'
        };
      
        return hints[word] || '';
      }
      
      function resetGame() {
        selectedCategory = null;
        selectedWord = null;
        guessedLetters = [];
        incorrectGuesses = 0;
      
        render();
      }
      
      function render()
        categoryButtons.forEach(button => {
          button.disabled = selectedCategory !== null;
        });
      
        guessedLettersElement.textContent = `Guessed Letters: ${guessedLetters.join(' ')}`;
        livesElement.textContent = `Lives: ${maxIncorrectGuesses - incorrectGuesses}`;
        spacemanImageElement.src = SPACE_MAN.one.img;
        clueElement.textContent = '';
        hintButton.disabled = false;
        resultMessageElement.textContent = '';
      
        if (selectedCategory) {
          clueElement.textContent = `Hint: ${getHint(selectedWord)}`;
        }
      
        const wordDisplay = selectedWord
          .split('')
          .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
          .join(' ');
        document.getElementById
        ('word-display').textContent = wordDisplay;

  buttonsContainer.innerHTML = '';

  if (selectedCategory) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    alphabet.forEach(letter => {
      const button = document.createElement('button');
      button.textContent = letter;
      button.dataset.letter = letter;
      button.disabled = guessedLetters.includes(letter);
      button.addEventListener('click', handleLetterClick);
      buttonsContainer.appendChild(button);
    });
  }
}


