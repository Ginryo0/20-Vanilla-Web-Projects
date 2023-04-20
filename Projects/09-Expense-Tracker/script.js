const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Course', amount: 150 },
// ];
const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);
let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value, // must be parsed
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);

    updateValues();
    updateLocalStorage();
    text.value = '';
    amount.value = '';
  }
}

// Generate Random ID
function generateID() {
  return Math.floor(Math.random() * 1000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get signs
  const sign = transaction.amount < 0 ? '-' : '+';

  // Create new list item
  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class='delete-btn' onclick='removeTransaction(${
      transaction.id
    })'>x</button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, curr) => (acc += curr), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, curr) => (acc += curr), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, curr) => (acc += curr), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.textContent = `$${income}`;
  money_minus.textContent = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  console.log(id);
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app

// Event listener
form.addEventListener('submit', addTransaction);
