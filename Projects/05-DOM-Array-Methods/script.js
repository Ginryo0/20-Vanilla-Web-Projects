const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

// Fetching random users and adding money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    wealth: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Adding new user to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Updating DOM
function updateDOM(providedData = data) {
  // Clearing main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
  providedData.forEach((item) => {
    const el = document.createElement('div');
    el.classList.add('person');
    el.innerHTML = `<strong>${item.name}</strong> ${formatWealth(item.wealth)}`;
    main.appendChild(el);
  });
}

// Doubling wealth
function double() {
  data = data.map((user) => {
    return { ...user, wealth: user.wealth * 2 };
    // user.wealth *= 2;
    // return user;
  });
  updateDOM(data);
}

// Filtering non millionaires
function showMillionaires() {
  data = data.filter((item) => item.wealth >= 1000000);
  console.log(data);
  updateDOM();
}

// Sorting by wealth (descending)
function sort() {
  data.sort((a, b) => b.wealth - a.wealth);
  updateDOM();
}

// Calculating total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.wealth), 0);

  const wealthEl = document.createElement('div');

  wealthEl.innerHTML = `<h3> Total Wealth: <strong>${formatWealth(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);

  // let total = data.reduce((prev, item) => (prev += item.wealth), 0);
  // main.insertAdjacentHTML('beforeend', `<h3>total: ${total} </h3>`);
}

// Formatting Wealth
function formatWealth(money) {
  return `$` + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', double);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sort);
calculateWealthBtn.addEventListener('click', calculateWealth);
