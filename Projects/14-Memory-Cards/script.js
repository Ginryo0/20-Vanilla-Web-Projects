const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show'); // show btn - add card form
const hideBtn = document.getElementById('hide'); // hide form
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEL = [];

// Storing cards data
const cardsData = getCardsData();

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Store in local storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  // reload on storage
  window.location.reload();
}

// const cardsData = [
//   {
//     question: 'What is a potato?',
//     answer: 'Good food',
//   },
//   {
//     question: 'Do you love konafa?',
//     answer: 'Konafa is everything',
//   },
//   {
//     question: 'What does a frog say?',
//     answer: 'Idk I am a human',
//   },
// ];

// Create all cards
function createCards() {
  cardsData.forEach((data, idx) => createCard(data, idx));
}
// Create a single card in DOM
function createCard(data, index) {
  const cardEl = document.createElement('div');
  cardEl.classList.add('card');

  if (index === 0) {
    cardEl.classList.add('active');
  }

  cardEl.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${data.question}</p>
      </div>
      <div class="inner-card-back">
        <p>${data.answer}</p>
      </div>
    </div>
  
  `;

  // Flipping listener
  cardEl.addEventListener('click', () =>
    cardEl.classList.toggle('show-answer')
  );

  // Update DOM
  cardsEL.push(cardEl);

  cardsContainer.appendChild(cardEl);

  updateCurrentText();
}

// Update current card number
function updateCurrentText() {
  currentEl.innerHTML = `${currentActiveCard + 1} / ${cardsEL.length}`;
}

// Initiate
createCards();

// Event Listeners

// Next btn
nextBtn.addEventListener('click', () => {
  cardsEL[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEL.length - 1) {
    currentActiveCard = cardsEL.length - 1;
  }

  cardsEL[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Prev btn
prevBtn.addEventListener('click', () => {
  cardsEL[currentActiveCard].className = 'card';

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEL[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Show add new card form
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// Hide form
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Adding new card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer }; // kinda reverse destructure -> property = variable
    createCard(newCard);
    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// Clear cards Btn
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});
