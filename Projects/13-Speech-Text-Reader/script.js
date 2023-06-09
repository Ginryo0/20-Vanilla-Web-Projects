const main = document.querySelector('main');
const voiceSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/game.jpg',
    text: 'I Want To Play minecraft',
  },
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');
  box.classList.add('box');

  const { image, text } = item;
  box.innerHTML = `
  <img src='${image}' alt='${text}'>
  <p class='info'>${text}</p>
  `;
  // to do - speech stuff
  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Init speech synthesis
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];
function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voiceSelect.appendChild(option);
  });
}

// Set text function
function setTextMessage(text) {
  message.text = text;
  console.log(message);
}

// Speak
function speakText() {
  speechSynthesis.speak(message);
}

// Change voice
function setVoice(e) {
  // set voice that has the name of select value
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// Voices changed
// according to MDN -> you have to get voices on each voice change
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// Close text box
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

// Change voice
voiceSelect.addEventListener('change', setVoice);

// Read text
readBtn.addEventListener('click', () => {
  // update message + speak message text
  message.text = textarea.value;
  speakText();
});
getVoices();
