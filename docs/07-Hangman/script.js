const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playAgainBtn = document.getElementById('play-btn');
const notification = document.getElementById('notification-container');
const wordRevealed = document.getElementById('final-message-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = [
  'application',
  'programming',
  'interface',
  'brotherhood',
  'building',
  'sturdy',
  'heat',
  'hero',
  'design',
  'pizza',
];

let selectedWord = words[Math.round(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  // convert selected word into array by split
  // map through that array to create span elements with correct letters if any
  // join span elements into one string
  wordEl.innerHTML = `${selectedWord
    .split('')
    .map(
      (letter) =>
        `<span class='letter'>${
          correctLetters.includes(letter) ? letter : ''
        }</span>`
    )
    .join('')}`;

  // console.log(wordEl.innerText); -> has a newline after each char
  const innerWord = wordEl.textContent.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 😃';
    popup.style.display = 'flex';
  }
}

// Updating UI when wrong letters are pressed
function updateWrongLettersEl() {
  const errors = wrongLetters.length;
  // Updating wrongLetters element
  wrongLettersEl.innerHTML = `
  ${errors > 0 ? `<p>Wrong</p>` : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Updating Hangamn
  figureParts.forEach((part, idx) => {
    if (idx < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Checking if game is lost
  if (errors === figureParts.length) {
    finalMessage.textContent = 'Unfortunately you lost. 😕';
    wordRevealed.textContent = `The words was: ${selectedWord}`;
    popup.style.display = 'flex';
  }
}

// Show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Keydown listener (letter press)
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    let letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Resetting game
playAgainBtn.addEventListener('click', () => {
  // Empty arrays and update word
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.round(Math.random() * words.length)];

  // Update UI
  displayWord();
  updateWrongLettersEl();
  popup.style.display = 'none';
});

displayWord();
