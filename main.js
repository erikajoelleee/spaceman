/*----- constants -----*/
const winAudio = new Audio('https://www.barbneal.com/wp-content/uploads/marvin13.mp3');
const loseAudio = new Audio('https://www.barbneal.com/wp-content/uploads/marvin11.mp3');
const CATEGORIES = {
  Animals: ['dog', 'cat', 'bird', 'fish', 'bugs'],
  Food: ['fruit', 'vegetable', 'meat', 'candy', 'bread'],
  Places: ['Bolivia', 'Canada', 'Philippines', 'France', 'Egypt']
};
const hints = [
  ['Man\'s best friend', 'A suspicion that bad luck will happen if one crosses you', 'Winged creatures', 'Catch them in the ocean', 'Six-legged insects'],
  ['One of the sweeter food groups', 'Leafy greens', 'Protein group', 'These can cause cavities', 'Carbs on carbs'],
  ['Country in South America', 'North of USA', 'Multi-island country in Asia', 'Country where the city of love is', 'Pyramids are found here']
];

/*----- app's state (variables) -----*/
let selectedCategory;
let selectedWord;
let guessedLetters;
let incorrectGuesses;
const maxIncorrectGuesses = 9; // Maximum incorrect guesses allowed
let isGameEnded = false;
let isHintDisplayed = false;

/*----- cached element references -----*/
const categoryButtons = Array.from(document.querySelectorAll('nav button'));
const buttonsContainer = document.getElementById('buttons');
const guessedLettersElement = document.getElementById('guessed-letters');
const livesElement = document.getElementById('mylives');
const clueElement = document.getElementById('clue');
const hintButton = document.getElementById('hint');
const resetButton = document.getElementById('reset');
const resultMessageElement = document.getElementById('result-message');
const wordDisplayElement = document.getElementById('word-display');

/*----- event listeners -----*/
categoryButtons.forEach(button => {
  button.addEventListener('click', handleCategorySelection);
});
buttonsContainer.addEventListener('click', handleLetterClick);
window.addEventListener('keydown', handleLetterPress);
hintButton.addEventListener('click', handleHint);
resetButton.addEventListener('click', resetGame);

winAudio.addEventListener('canplaythrough', () => {
  winAudio.readyToPlay = true;
});

loseAudio.addEventListener('canplaythrough', () => {
  loseAudio.readyToPlay = true;
});

/*----- functions -----*/
init();

function init() {
  selectedCategory = null;
  selectedWord = null;
  guessedLetters = [];
  incorrectGuesses = 0;
  isGameEnded = false;
  isHintDisplayed = false;

  render();
}

function handleCategorySelection(event) {
  selectedCategory = event.target.textContent;
  selectedWord = getRandomWordFromCategory(selectedCategory);
  guessedLetters = Array(selectedWord.length).fill('');

  // Reset incorrectGuesses
  incorrectGuesses = 0;
  isHintDisplayed = false;

  render();
}

function handleLetterClick(event) {
  const pressedLetter = event.target.textContent;
  event.target.disabled = true; // Disable the clicked button
  processGuess(pressedLetter);
}

function handleLetterPress(event) {
  if (!isGameEnded) {
    const pressedLetter = event.key.toLowerCase();
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    if (lowercaseLetters.includes(pressedLetter) && !guessedLetters.includes(pressedLetter)) {
      const button = document.querySelector(`#buttons button[data-letter="${pressedLetter}"]`);
      if (button) {
        button.disabled = true; // Disable the corresponding button
      }
      processGuess(pressedLetter);
    }
  }

  const isWordGuessed =
    guessedLetters.length === selectedWord.length &&
    guessedLetters.every((letter, index) => letter.toLowerCase() === selectedWord[index].toLowerCase());

  if (isWordGuessed) {
    endGame(true);
  }
}

function processGuess(letter) {
  const lowercaseLetter = letter.toLowerCase(); // Convert the guessed letter to lowercase

  if (selectedWord.toLowerCase().includes(lowercaseLetter)) {
    // Correct guess
    guessedLetters = guessedLetters.map((guessedLetter, index) =>
      selectedWord[index].toLowerCase() === lowercaseLetter ? selectedWord[index] : guessedLetter
    );
  } else {
    // Incorrect guess
    incorrectGuesses++;
    guessedLetters.push(lowercaseLetter); // Add the incorrect guess to the guessedLetters array
  }

  // Check if the game is won or lost
  if (guessedLetters.join('').toLowerCase() === selectedWord.toLowerCase()) {
    endGame(true);
  } else if (incorrectGuesses >= maxIncorrectGuesses) {
    endGame(false);
  }

  // Update guessedLetters array for correct letter in the hidden word
  const updatedGuessedLetters = guessedLetters.map((guessedLetter, index) => {
    const selectedLetter = selectedWord[index];
    if (
      guessedLetter === '' &&
      (selectedLetter.toLowerCase() === lowercaseLetter || selectedLetter.toUpperCase() === letter)
    ) {
      return selectedLetter;
    }
    return guessedLetter;
  });
  guessedLetters = updatedGuessedLetters;

  render();
}

function endGame(isWon) {
  isGameEnded = true;

  if (isWon) {
    resultMessageElement.textContent = 'You did it!';
    if (winAudio.readyToPlay) {
      winAudio.play();
    }
  } else {
    resultMessageElement.textContent = `Oops! Game over. The word was "${selectedWord}".`;
    if (loseAudio.readyToPlay) {
      loseAudio.play();
    }
  }

  // Disable letter buttons
  buttonsContainer.removeEventListener('click', handleLetterClick);
  window.removeEventListener('keydown', handleLetterPress);

  // Disable hint button
  hintButton.disabled = true;
}

function resetGame() {
  selectedCategory = null;
  selectedWord = null;
  guessedLetters = [];
  incorrectGuesses = 0;
  isGameEnded = false;
  isHintDisplayed = false;

  // Re-enable all letter buttons
  const letterButtons = buttonsContainer.querySelectorAll('button');
  letterButtons.forEach(button => {
    button.disabled = false;
  });

  render();
}

function render() {
  categoryButtons.forEach(button => {
    button.disabled = selectedCategory !== null;
  });

  guessedLettersElement.textContent = `Guessed Letters: ${guessedLetters.join(' ')}`;
  livesElement.textContent = `Lives: ${maxIncorrectGuesses - incorrectGuesses}`;
  clueElement.textContent = '';
  hintButton.disabled = false;
  resultMessageElement.textContent = '';

  if (selectedCategory && !isHintDisplayed) {
    clueElement.textContent = 'Click "Hint" to reveal a hint.';
  } else if (selectedCategory && isHintDisplayed) {
    clueElement.textContent = `Hint: ${getHint(selectedWord)}`;
  }

  const wordDisplay = selectedWord
    .split('')
    .map((letter, index) =>
      guessedLetters.includes(letter.toLowerCase()) || guessedLetters.includes(letter.toUpperCase()) ? letter : '_'
    )
    .join(' ');
  wordDisplayElement.textContent = wordDisplay;

  buttonsContainer.innerHTML = '';

  if (selectedCategory) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    alphabet.forEach(letter => {
      const button = document.createElement('button');
      button.textContent = letter;
      button.dataset.letter = letter.toLowerCase();
      button.disabled = guessedLetters.includes(letter.toLowerCase()) || guessedLetters.includes(letter.toUpperCase());
      button.addEventListener('click', handleLetterClick);
      buttonsContainer.appendChild(button);
    });
  }
}

function getRandomWordFromCategory(category) {
  const words = CATEGORIES[category];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function handleHint() {
  if (!isHintDisplayed) {
    isHintDisplayed = true;
    clueElement.textContent = `Hint: ${getHint(selectedWord)}`;
  }
}

function getHint(word) {
  const categoryIndex = Object.values(CATEGORIES).findIndex(category => category.includes(word));
  if (categoryIndex !== -1) {
    return hints[categoryIndex][CATEGORIES[selectedCategory].indexOf(word)];
  }
  return '';
}