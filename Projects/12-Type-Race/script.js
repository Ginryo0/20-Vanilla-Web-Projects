const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// Words Array
let words = [];
// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 20;
let timeInterval;

// Set difficulty from lw or med
let difficulty =
  localStorage.getItem('difficulty') != null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Set difficulty select value from lw or med
difficultySelect.value =
  localStorage.getItem('difficulty') != null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Fetching API to get random words
async function getWords() {
  const res = await fetch(
    `https://random-word-api.herokuapp.com/word?number=1000`
  );
  const data = await res.json();

  return data;
}

// Generate random word from array
function getRandomWord() {
  return words[Math.round(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.textContent = score;
}

// Update timer
function updateTime() {
  time--;
  timeEl.textContent = `${time}s`;

  if (time === 0) {
    clearInterval(timeInterval);

    // end game
    gameOver();
  }
}

// Game Over, show game over screen
function gameOver() {
  endgameEl.innerHTML = `
  <h1>Game Over</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
  `;
  endgameEl.style.display = 'flex';
}

// Init game = fetch API + Get random word
async function init() {
  words = await getWords();

  // focus text
  text.focus();

  // Start counting down
  timeInterval = setInterval(updateTime, 1000);

  addWordToDOM();
}

// Event listeners
text.addEventListener('input', (e) => {
  const insrtedText = e.target.value.toLowerCase();

  if (insrtedText === randomWord) {
    addWordToDOM();
    updateScore();

    // clear input field
    e.target.value = '';

    if (difficulty === 'medium') {
      time += 3;
    } else if (difficulty === 'easy') {
      time += 5;
    } else {
      time++;
    }
    updateTime();
  }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// listen to change on the form itself
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});

init();
