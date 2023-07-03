/*----- constants -----*/
const AUDIO = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');



/*----- app's state (variables) -----*/
let scores; //object key of 'p' -> Player score; 't' -> Tie; 'c' -> Computer score {p: 0, t:0, c:0}

let results; // Object key of 'p' -> player results; 'c' computer results; {p: 'p', c: 's'}
// values of 'r' -> rock, 'p' -> paper, 's' -> scissors

let winner; // string 'w' if player wins, 'l' if player loses {'w', 'l'}

/*----- cached element references -----*/
const pResultEl = document.getElementById('p-result');
const cResultEl = document.getElementById('c-result');
const countdownEl = document.getElementById('countdown');


/*----- event listeners -----*/
document.querySelector('main')
  .addEventListener('click', handleChoice);

/*----- functions -----*/
init();

// initialize all state, then call render();
function init() {
  scores = {
    p: 0,
    t: 0,
    c:0
  };
  results = {
    p: 'r',
    c: 'r'
  };
  winner = 't';
  render();
}

// in response to user interaction (player makes a move),
// we update all impaced state, then finally, call render
function handleChoice (evt) {
  // guards (do nothing unless one of the three buttons were clicked)
  if (evt.target.tagName !== 'BUTTON') return;
  // player has made a chocie
  results.p = evt.target.innerText.toLowerCase();
// compute a random choice for the computer
results.c = getRandomRPS();
  winner = getWinner();
  scores[winner] ++;
  render();
}

function getWinner() {
  if (results.p === results.c) return 't';
  return RPS_LOOKUP[results.p].beats  === results.c ? 'p' : 'c';
}

function getRandomRPS() {
  const rps = Object.keys(RPS_LOOKUP);
  const rndIdx = Math.floor(Math.random() * rps.length);
  return rps[rndIdx];
}

function renderScores() {
  for (let key in scores) {
    const scoreEl = document.getElementById(`${key}-score`);
    scoreEl.innerText = scores[key];
  }
}

function renderResults() {
 pResultEl.src = RPS_LOOKUP[results.p].img;
 cResultEl.src = RPS_LOOKUP[results.c].img;
 pResultEl.style.borderColor = winner === 'p' ? 'grey' : 'white';
 cResultEl.style.borderColor = winner === 'p' ? 'grey' : 'white';
}

// transfer/visualize all state to the DOM
function render() {
  renderCountdown(function() {
  renderScores();
  renderResults();
    });
}

function renderCountdown(cb) {
  let count = 3; 
  AUDIO.currentTime = 0;
  AUDIO.play();
  countdownEl.style.visibility = 'visible';
  countdownEl.innerText = count;
  const timerId = setInterval(function() {
    count--;
    if (count) {
      countdownEl.innerText = count;
    } else {
      clearInterval(timerId);
      countdownEl.style.visibility = 'hidden';
      cb();
    }
  }, 1000);
}