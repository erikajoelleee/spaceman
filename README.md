# spaceman

By Erika Roncal
Spaceman Game Project 1 SEI-620

Welcome to the Spaceman game! It's an exciting word-guessing challenge that will put your skills to the test.

In this game, you'll have the opportunity to explore different categories such as Animals, Food, and Places. Choose a category and try to guess the hidden word within a limited number of attempts.

As you make your guesses, correct letters will be revealed, bringing you closer to victory. But be careful! Incorrect guesses will bring the Spaceman one step closer to life. Can you guess the word before it's too late?

To help you along the way, there's a hint feature to provide clues related to the word's category. Keep an eye on the guessed letters and the remaining lives indicator to track your progress.

Get ready to launch into an intergalactic word-guessing adventure! Let's see if you have what it takes to unravel the hidden words and emerge victorious against the Spaceman!

# Screenshot

<img src="https://i.imgur.com/9d7MFQt.jpg">
<img src="https://i.imgur.com/pgcXkTD.png">
<img src="https://i.imgur.com/kZGdEUU.png">

# Technologies Used

- JavaScript
- HTML
- CSS

# Getting Started

[Spaceman](https://erikajoelleee.github.io/spaceman/)

1. Initialize the game:
   1.1 Create an arrav of word list(s).
   1.2. Select a random word from the chosen array.
   1.3. Create an empty array to store the guessed letters.
   1.4. Set the maximum number of incorrect guesses allowed (9).
   1.5. Set the initial number of incorrect guesses to 0.
2. Display game instructions.
3. Repeat until the game ends:
   3.1. Display the spaceman picture based on the number of incorrect guesses.
   3.2. Display the word with underscores for unguessed letters and correctly guessed letters.
   3.3. Display the letters guessed.
   3.4. Prompt the player to guess a letter.
   3.5. Validate the input:
   3.5.1. If the input is not a single letter, display an error message and return to 3.4.
   3.5.2. If the letter has been guessed already, display an error message and return to 3.4.
   3.6. Add the guessed letter to the array ot guessed letters.
   3.7. Check if the guessed letter is in the word:
   3.7.1. If the letter is in the word, reveal it in the displayed word.
   3.7.2. If the letter is not in the word, incrementing the number of incorrect guesses and lives would reflect that it is going down.
   3.8. Player won:
   3.8.1. If all letters were guessed correctly, display a congrats message and end the game.
   3.9. Player lost:
   3.9.1. If incorrect guesses exceed the maximum allowed, display a defeat message and end the game.
4. Display the final state of the game (word, spaceman/hangman, guessed letters).
5. Ask the player if they want to play
   again
   5.1. If the player wants to play again, return to step 1.
   5.2. If the player does not want to play again, end the game.

# Next Steps

1. Newer icebox features to include images that will appear once Spaceman is launched when an incorrect letter is guessed in the code
2. Lightning round mode - speed round of words to guess within a set time limit
3. Keyboard functionality - using the keyboard as well as the clickable button board for easier use
4. Fix the wireframe to match up with original design
5. Change the cursor to be a rocketship to go along with the theme
6. Format for mobile users
7. Format for tablet users
8. Fix the reset function so it doesn't overlay when it starts a new game
